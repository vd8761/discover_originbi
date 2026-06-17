"use client";

export const dynamic = "force-dynamic";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Testimonial from "@/components/Testimonial";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/layout/Footer";

import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { EyeIcon, EyeOffIcon, PlayIcon } from "@/components/icons";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/CustomSelect";
import MobileInput from "@/components/ui/MobileInput";
import Turnstile from "@/components/ui/Turnstile";

import { registerStudent, validateStudent, validateReferralCode, getDepartments } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { T, useTranslation } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function RegisterPageContent() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [referralValidationStatus, setReferralValidationStatus] = useState<'valid' | 'invalid' | 'checking' | null>(null);
  const [affiliatorName, setAffiliatorName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    gender: "MALE",
    email: "",
    countryCode: "+91",
    mobile: "",
    password: "",
    department: "",
    currentYear: "",
    referralCode: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);

  React.useEffect(() => {
    setIsLoadingDepartments(true);
    getDepartments().then((departments: any[]) => {
      if (departments && departments.length > 0) {
        const options = departments
          .filter((d: any) => d.isActive)
          .map((d: any) => ({
            value: d.id,
            label: d.name
          }));
        setDepartmentOptions(options);
      }
      setIsLoadingDepartments(false);
    }).catch(() => {
      setIsLoadingDepartments(false);
    });
  }, []);

  const validatePassword = (pwd: string) => {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Minimum 8 characters";
    if (!/[A-Z]/.test(pwd)) return "Must contain at least 1 uppercase letter";
    if (!/[a-z]/.test(pwd)) return "Must contain at least 1 lowercase letter";
    if (!/[0-9]/.test(pwd)) return "Must contain at least 1 number";
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) return "Must contain at least 1 special character";
    return "";
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.mobile.trim()) errors.mobile = "Mobile number is required";
    if (!formData.department) errors.department = "Department is required";
    if (!formData.currentYear) errors.currentYear = "Current year is required";
    else if (formData.currentYear !== "1" && formData.currentYear !== "2" && formData.currentYear !== "3" && formData.currentYear !== "4") {
      errors.currentYear = "Must be between 1 and 4";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = async () => {
    // Clear previous API and field-specific errors immediately
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.apiError;
      delete newErrors.email;
      delete newErrors.mobile;
      return newErrors;
    });

    // Only validate if we have at least one field filled to avoid unnecessary calls.
    if (!formData.email && !formData.mobile) return;

    try {
      const result = await validateStudent({
        email: formData.email,
        mobile_number: formData.mobile,
        country_code: formData.countryCode,
      });

      if (result && !result.isValid) {
        const fieldName = result.field === 'mobile_number' ? 'mobile' : result.field;
        if (fieldName && (fieldName === 'email' || fieldName === 'mobile')) {
          setFormErrors(prev => ({ ...prev, [fieldName]: result.message }));
        } else {
          setFormErrors(prev => ({ ...prev, apiError: result.message }));
        }
      }

    } catch (error: any) {
      console.error("Validation Error:", error);
      // Don't show generic error on type/blur if it's not from existence check
      // Only set apiError if it's explicitly a business rule violation
      if (error.message && (error.message.includes("already exists") || error.message.includes("registered"))) {
        setFormErrors(prev => ({ ...prev, apiError: error.message }));
      }
    }
  };

  // Instant Validation Debounce
  React.useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isMobilePossible = formData.mobile.length >= 8;

    if (!isEmailValid && !isMobilePossible) return;

    const timer = setTimeout(() => {
      handleBlur();
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.email, formData.mobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const { referralCode, clearReferral } = useReferral();

  React.useEffect(() => {
    // If ?ref= param exists but is empty/whitespace, redirect to base register URL
    const searchRef = searchParams.get('ref');
    if (searchParams.has('ref') && (!searchRef || !searchRef.trim())) {
      clearReferral();
      router.replace('/register');
      return;
    }

    if (referralCode && referralCode.trim()) {
      setReferralValidationStatus('checking');
      validateReferralCode(referralCode.trim())
        .then((res) => {
          setReferralValidationStatus('valid');
          setFormData(prev => ({ ...prev, referralCode: referralCode.trim() }));
          if (res?.name) {
            setAffiliatorName(res.name);
          }
        })
        .catch((err) => {
          console.error("Invalid referral code:", err);
          setReferralValidationStatus('invalid');
          clearReferral();
        });
    }
  }, [referralCode, searchParams, router, clearReferral]);

  const handleClearInvalidReferral = () => {
    clearReferral();
    router.replace('/register');
    setReferralValidationStatus(null);
  };

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
  ];

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setFormErrors({});

    try {
      // 1. Validate User First
      const validationResult = await validateStudent({
        email: formData.email,
        mobile_number: formData.mobile,
        country_code: formData.countryCode,
      });

      if (validationResult && !validationResult.isValid) {
        const fieldName = validationResult.field === 'mobile_number' ? 'mobile' : validationResult.field;
        if (fieldName && (fieldName === 'email' || fieldName === 'mobile')) {
          setFormErrors(prev => ({ ...prev, [fieldName]: validationResult.message }));
        } else {
          setFormErrors(prev => ({ ...prev, apiError: validationResult.message || "User validation failed." }));
        }
        setIsLoading(false);
        return;
      }

      // 2. Load Razorpay
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: (Number(process.env.NEXT_PUBLIC_REGISTRATION_COST) || 999) * 100, // Amount is in currency subunits. Default: 99900 paise = 999 INR
        currency: "INR",
        name: "Origin BI",
        description: "Student Registration Fee",
        image: "https://mind.originbi.com/logo.png", // Optional: Add logo if available
        handler: async function (response: any) {
          // Payment Success - Now Register Student
          try {
            const amount = (Number(process.env.NEXT_PUBLIC_REGISTRATION_COST) || 999).toString();
            const registerResponse = await registerStudent({
              full_name: formData.name,
              email: formData.email,
              mobile_number: formData.mobile,
              country_code: formData.countryCode,
              password: formData.password,
              gender: formData.gender,
              program_code: 'COLLEGE_STUDENT',
              department_degree_id: formData.department,
              current_year: formData.currentYear,
              referral_code: formData.referralCode || undefined,
              payment_amount: amount,
              payment_reference: response.razorpay_payment_id,
              payment_provider: 'RAZORPAY',
              turnstile_token: turnstileToken || undefined,
            });

            if (registerResponse.success) {
              setIsSuccess(true);
            }
          } catch (error: any) {
            console.error(error);
            setFormErrors(prev => ({ ...prev, apiError: error.message || "Payment successful but registration failed. Please contact support." }));
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          address: "Origin BI Corporate Office",
        },
        theme: {
          color: "#1ED36A", // Origin BI Green
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error("Validation Error:", error);
      setFormErrors(prev => ({ ...prev, apiError: error.message || "User validation failed." }));
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
        if (loginUrl) {
          window.open(loginUrl, '_blank');
          // Optionally redirect current tab to home after opening new one
          router.push('/');
        } else {
          router.push('/');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#19211c] font-sans text-white transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Noise Texture (Whole Page) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Force Light Mode / High Contrast Styles for Register Form Card */}
      <style dangerouslySetInnerHTML={{ __html: `
        .register-form-container {
          color: #19211c !important;
        }
        .register-form-container h1,
        .register-form-container h2,
        .register-form-container h3,
        .register-form-container label {
          color: #19211c !important;
        }
        .register-form-container p {
          color: #4a5568 !important;
        }
        .register-form-container p.text-red-500 {
          color: #c63232 !important;
        }
        .register-form-container input {
          background-color: #ffffff !important;
          color: #19211c !important;
          border-color: #cbd5e1 !important;
        }
        .register-form-container input:focus {
          border-color: #1ed36a !important;
          outline: none !important;
        }
        .register-form-container input::placeholder {
          color: rgba(25, 33, 28, 0.35) !important;
        }
        .register-form-container button.justify-between:not([type="submit"]) {
          background-color: #ffffff !important;
          color: #19211c !important;
          border-color: #cbd5e1 !important;
        }
        .register-form-container button.justify-between:not([type="submit"]) span {
          color: #19211c !important;
        }
        .register-form-container button.justify-between:not([type="submit"]) span.text-brand-dark-primary\\/30,
        .register-form-container button.justify-between:not([type="submit"]) span.dark\\:text-brand-text-secondary\\/30 {
          color: rgba(25, 33, 28, 0.35) !important;
        }
        .register-form-container button.justify-between:not([type="submit"]) svg {
          color: #19211c !important;
          opacity: 0.6 !important;
        }
        /* Dropdowns with animations */
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .register-form-container .relative > div.absolute.shadow-2xl {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          animation: dropdownSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top left;
        }
        .register-form-container div.absolute.shadow-2xl input {
          background-color: #f7fafc !important;
          color: #19211c !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
        }
        .register-form-container div.absolute.shadow-2xl button[type="button"] {
          background-color: transparent !important;
          color: #19211c !important;
        }
        .register-form-container div.absolute.shadow-2xl button[type="button"]:hover {
          background-color: rgba(30, 211, 106, 0.1) !important;
          color: #1ed36a !important;
        }
        .register-form-container div.absolute.shadow-2xl button[type="button"].bg-brand-green {
          background-color: #1ed36a !important;
          color: #ffffff !important;
        }
        .register-form-container div.absolute.shadow-2xl button[type="button"].bg-brand-green span {
          color: #ffffff !important;
        }
        /* Gender selections */
        .register-form-container .relative.w-full.bg-gray-100 {
          background-color: rgba(0, 0, 0, 0.05) !important;
        }
        .register-form-container .relative.w-full.bg-gray-100 button[type="button"] {
          background-color: transparent !important;
          color: rgba(25, 33, 28, 0.6) !important;
        }
        .register-form-container .relative.w-full.bg-gray-100 button[type="button"].bg-brand-green {
          background-color: #1ed36a !important;
          color: #ffffff !important;
        }
        .register-form-container .relative.w-full.bg-gray-100 button[type="button"].bg-brand-green span {
          color: #ffffff !important;
        }
        /* Password Strength Card overrides */
        .register-form-container .bg-gray-50\\/50 {
          background-color: rgba(255, 255, 255, 0.6) !important;
          border-color: rgba(0, 0, 0, 0.05) !important;
        }
        .register-form-container .bg-gray-50\\/50 span {
          color: #4a5568 !important;
        }
        .register-form-container .bg-gray-50\\/50 .text-brand-green {
          color: #1ed36a !important;
        }
        /* Referral overrides */
        .register-form-container .bg-brand-green\\/5 {
          background-color: rgba(30, 211, 106, 0.08) !important;
          border-color: rgba(30, 211, 106, 0.2) !important;
        }
        .register-form-container .bg-brand-green\\/5 p {
          color: #19211c !important;
        }
        .register-form-container .bg-brand-green\/5 span {
          color: #1ed36a !important;
        }
        /* Register Submit Button Centering & Arrow Right Align */
        .register-submit-btn {
          justify-content: center !important;
          position: relative !important;
          padding-left: 4.5rem !important;
          padding-right: 4.5rem !important;
        }
        .register-submit-btn > span {
          width: auto !important;
          text-align: center !important;
        }
        .register-submit-btn > div:nth-of-type(1) {
          position: absolute !important;
          right: 1.25rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        .register-submit-btn:hover > div:nth-of-type(1) {
          transform: translateY(-50%) !important;
        }
      `}} />

      <Header showRegisterButton={false} />

      <main className="flex-1 w-full relative z-10 pt-28 lg:pt-32 pb-16 flex flex-col justify-start gap-16 md:gap-24">
        <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">

            {/* Left Column: Form Card */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
              <div
                className="w-full rounded-[16px] p-6 md:p-8 relative overflow-hidden register-form-container text-left"
                style={{
                  backgroundColor: '#f4f4f4',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Gradient Border Overlay */}
                <div
                  className="absolute inset-0 rounded-[16px] pointer-events-none z-20"
                  style={{
                    border: '2.5px solid transparent',
                    background: 'linear-gradient(135deg, #FF4B4B, #1ED36A) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                {/* Card Noise Texture */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {referralValidationStatus === 'checking' ? (
                    <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
                      <div className="w-16 h-16 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-6"></div>
                      <h2 className="text-2xl font-bold text-white mb-2">{/* @ts-ignore */} <T>Validating URL...</T> </h2>
                      <p className="text-gray-400">{/* @ts-ignore */} <T>Please wait while we check the URL.</T> </p>
                    </div>
                  ) : referralValidationStatus === 'invalid' ? (
                    <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
                      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">{/* @ts-ignore */} <T>Invalid URL</T> </h2>
                      <p className="text-gray-400 mb-8 max-w-sm">
                        {/* @ts-ignore */} <T> The URL you are using is invalid or has expired. You can still proceed with a standard registration below. </T> </p>
                      <Button
                        onClick={handleClearInvalidReferral}
                        noDefaultSize={true}
                        className="rounded-full px-10 h-14 text-lg font-bold shadow-lg"
                      >
                        {/* @ts-ignore */} <T> Continue to Register </T> </Button>
                    </div>
                  ) : isSuccess ? (
                    <div className="w-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
                      <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">{/* @ts-ignore */} <T>Registration Successful!</T> </h2>
                      <p className="text-gray-400 mb-8 max-w-sm">
                        {/* @ts-ignore */} <T> Your account has been created. You can take your assessment immediately. Redirecting you to the login page... </T> </p>
                      <div className="w-full max-w-xs bg-brand-dark-tertiary h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-green animate-progress origin-left w-full"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl lg:text-4xl font-sans font-bold tracking-tight mb-3 text-white">
                        {/* @ts-ignore */} <T> Start your </T> <span className="text-brand-green">{/* @ts-ignore */} <T>journey</T> </span>
                      </h1>

                      <p className="text-base text-gray-400 mb-8 font-light leading-relaxed max-w-md">
                        {/* @ts-ignore */} <T> Create your student profile to unlock exclusive insights and discover your potential. </T> </p>

                      {affiliatorName && (
                        <div className="flex items-center gap-3 p-4 mb-8 bg-brand-green/5 border border-brand-green/20 rounded-2xl text-white animate-fade-in shadow-sm">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          </div>
                          <p className="font-medium text-sm">
                            {/* @ts-ignore */} <T> You're signing up using </T> <span className="font-bold text-brand-green">{affiliatorName}</span>'s {/* @ts-ignore */} <T> referral link </T>
                          </p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="w-full space-y-4 notranslate" noValidate>

                        {/* Name & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4">
                          <Input
                            label="Full Name"
                            name="name"
                            required
                            placeholder="E.g. John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            error={formErrors.name}
                            className="bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
                          />

                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                              {/* @ts-ignore */} <T> Gender </T> <span className="text-brand-red">*</span>
                            </label>
                            <div className="relative w-full bg-gray-100 dark:bg-brand-dark-tertiary rounded-full p-1 flex h-12">
                              {genderOptions.map((g) => (
                                <button
                                  key={g.value}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, gender: g.value }))}
                                  className={`flex-1 text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 cursor-pointer ${formData.gender === g.value
                                    ? "bg-brand-green text-white shadow-md"
                                    : "text-gray-500 dark:text-gray-400 hover:text-brand-green"
                                    }`}
                                >
                                  {/* @ts-ignore */} <T>{g.label}</T>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <Input
                          type="email"
                          label="Email Address"
                          name="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={formErrors.email}
                          className="bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
                        />

                        {/* Mobile Number */}
                        <MobileInput
                          label="Mobile Number"
                          required
                          countryCode={formData.countryCode}
                          phoneNumber={formData.mobile}
                          onCountryChange={(code) => {
                            setFormData(prev => ({ ...prev, countryCode: code }));
                            if (formErrors.mobile) {
                              setFormErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors.mobile;
                                return newErrors;
                              });
                            }
                          }}
                          onPhoneChange={(num) => {
                            setFormData(prev => ({ ...prev, mobile: num }));
                            if (formErrors.mobile) {
                              setFormErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors.mobile;
                                return newErrors;
                              });
                            }
                          }}
                          error={formErrors.mobile}
                          onBlur={handleBlur}
                          className="bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full transition-all h-12"
                        />

                        {/* Password */}
                        <Input
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          name="password"
                          required
                          placeholder="Min 8 chars"
                          value={formData.password}
                          onChange={handleChange}
                          error={formErrors.password}
                          className="bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
                          suffix={
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="cursor-pointer flex items-center transition-colors hover:text-brand-green text-gray-400 pr-2"
                            >
                              {showPassword ? (
                                <EyeIcon className="h-5 w-5" />
                              ) : (
                                <EyeOffIcon className="h-5 w-5" />
                              )}
                            </button>
                          }
                        />

                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <div className="px-5 py-4 bg-gray-50/50 dark:bg-brand-dark-tertiary/30 rounded-2xl space-y-3 animate-fade-in border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                              {[
                                { label: "Min 8 Chars", valid: formData.password.length >= 8 },
                                { label: "Uppercase", valid: /[A-Z]/.test(formData.password) },
                                { label: "Lowercase", valid: /[a-z]/.test(formData.password) },
                                { label: "One Number", valid: /[0-9]/.test(formData.password) },
                                { label: "Special Char", valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) },
                              ].map((check, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 group">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${check.valid ? 'bg-brand-green text-white scale-110 shadow-sm shadow-brand-green/20' : 'bg-gray-100 dark:bg-brand-dark-secondary text-gray-300'}`}>
                                    {check.valid ? (
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                      <div className="w-1 h-1 bg-current rounded-full transition-all group-hover:scale-150"></div>
                                    )}
                                  </div>
                                  <span className={`text-[10.5px] font-bold transition-colors duration-300 ${check.valid ? 'text-brand-green' : 'text-gray-500 dark:text-gray-400'}`}>
                                    <T>{check.label}</T>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Academic Details - Simplified */}
                        <div className="pt-2 space-y-4 relative z-20">
                          <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">{/* @ts-ignore */} <T>Academic Details</T> </h3>
                            <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5 w-full">
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                                {/* @ts-ignore */} <T> Department </T> <span className="text-brand-red">*</span>
                              </label>
                              {isLoadingDepartments ? (
                                <div className="h-12 bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary rounded-full px-6 flex items-center justify-center">
                                  <svg className="animate-spin h-5 w-5 text-brand-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                </div>
                              ) : (
                                <CustomSelect
                                  required
                                  options={departmentOptions}
                                  value={formData.department}
                                  onChange={(val) => handleSelectChange("department", val)}
                                  placeholder="Select Department"
                                  buttonClassName="h-12 bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all"
                                  error={formErrors.department}
                                />
                              )}
                            </div>

                            <div className="space-y-1.5 w-full">
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                                {/* @ts-ignore */} <T> Current Year </T> <span className="text-brand-red">*</span>
                              </label>
                              <CustomSelect
                                required
                                options={[
                                  { value: "1", label: "1st Year" },
                                  { value: "2", label: "2nd Year" },
                                  { value: "3", label: "3rd Year" },
                                  { value: "4", label: "4th Year" }
                                ]}
                                value={formData.currentYear}
                                onChange={(val) => handleSelectChange("currentYear", val)}
                                placeholder="Select Year"
                                buttonClassName="h-12 bg-white dark:bg-brand-dark-secondary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all"
                                error={formErrors.currentYear}
                              />
                            </div>
                          </div>
                        </div>

                        {formErrors.apiError && (
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm flex items-center gap-3 border border-red-100 dark:border-red-900/30">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {formErrors.apiError}
                          </div>
                        )}

                        <div className="relative z-0 space-y-6 pt-2">
                          <div className="flex justify-center pt-2">
                            <Turnstile onVerify={handleTurnstileVerify} />
                          </div>
                          <Button
                            type="submit"
                            noDefaultSize={true}
                            fullWidth
                            showArrow={true}
                            disabled={isLoading || Object.keys(formErrors).length > 0 || !turnstileToken}
                            className="h-14 text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 rounded-full disabled:opacity-50 register-submit-btn"
                          >
                            {isLoading ? <T>Processing...</T> : <T>Register & Pay</T>}
                          </Button>
                        </div>

                        <div className="text-center pt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {/* @ts-ignore */} <T> Already have an account?</T> {" "}
                            <a href={process.env.NEXT_PUBLIC_LOGIN_URL || "#"} className="text-brand-green font-bold hover:underline transition-all">
                              {/* @ts-ignore */} <T> Log in </T> </a>
                          </p>
                        </div>

                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Testimonial Carousel */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-stretch min-h-[450px] lg:min-h-full">
              <div className="w-full h-full rounded-[16px] overflow-hidden shadow-2xl">
                <Testimonial />
              </div>
            </div>

          </div>
        </div>

        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div>{/* @ts-ignore */} <T>Loading...</T> </div>}>
      <RegisterPageContent />
    </React.Suspense>
  );
}





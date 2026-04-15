"use client";

export const dynamic = "force-dynamic";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { EyeIcon, EyeOffIcon, PlayIcon } from "@/components/icons";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/CustomSelect";
import MobileInput from "@/components/ui/MobileInput";
import RegisterSteps from "@/components/sections/RegisterSteps";
import Turnstile from "@/components/ui/Turnstile";

import MobileHowItWorksCarousel from "@/components/sections/MobileHowItWorksCarousel";
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
        amount: (Number(process.env.NEXT_PUBLIC_REGISTRATION_COST) || 500) * 100, // Amount is in currency subunits. Default: 50000 paise = 500 INR
        currency: "INR",
        name: "Origin BI",
        description: "Student Registration Fee",
        image: "https://mind.originbi.com/logo.png", // Optional: Add logo if available
        handler: async function (response: any) {
          // Payment Success - Now Register Student
          try {
            const amount = (Number(process.env.NEXT_PUBLIC_REGISTRATION_COST) || 500).toString();
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-dark-primary font-sans text-brand-dark-primary dark:text-white transition-colors duration-300">
      <Header showRegisterButton={false} />

      <main className="flex-1 w-full relative">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row">

            {/* Left Side - Form Section (scrolls with page) */}
            <div className="w-full lg:w-1/2 px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] pt-28 lg:pt-36 pb-12 bg-white dark:bg-brand-dark-primary relative z-10 transition-colors duration-300">

              {/* Decorative Top Line */}
              <div className="hidden lg:block w-16 h-1 bg-brand-green mb-6 rounded-full"></div>



              {referralValidationStatus === 'checking' ? (
                <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-fade-in py-10">
                  <div className="w-16 h-16 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-6"></div>
                  <h2 className="text-2xl font-bold text-brand-dark-primary dark:text-white mb-2">{/* @ts-ignore */} <T>Validating URL...</T> </h2>
                  <p className="text-gray-500 dark:text-gray-400">{/* @ts-ignore */} <T>Please wait while we check the URL.</T> </p>
                </div>
              ) : referralValidationStatus === 'invalid' ? (
                <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-fade-in py-10">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-brand-dark-primary dark:text-white mb-4">{/* @ts-ignore */} <T>Invalid URL</T> </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                    {/* @ts-ignore */} <T> The URL you are using is invalid or has expired. You can still proceed with a standard registration below. </T> </p>
                  <Button
                    onClick={handleClearInvalidReferral}
                    size="lg"
                    className="rounded-full px-10 h-14 text-lg font-bold shadow-lg"
                  >
                    {/* @ts-ignore */} <T> Continue to Register </T> </Button>
                </div>
              ) : isSuccess ? (
                <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-fade-in py-10">
                  <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-brand-dark-primary dark:text-white mb-4">{/* @ts-ignore */} <T>Registration Successful!</T> </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                    {/* @ts-ignore */} <T> Your account has been created. You can take your assessment immediately. Redirecting you to the login page... </T> </p>
                  <div className="w-full max-w-xs bg-gray-100 dark:bg-brand-dark-tertiary h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green animate-progress origin-left w-full"></div>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl lg:text-4xl font-sans font-bold tracking-tight mb-3 text-brand-dark-primary dark:text-white">
                    {/* @ts-ignore */} <T> Start your </T> <span className="text-brand-green">{/* @ts-ignore */} <T>journey</T> </span>
                  </h1>

                  <p className="text-base text-gray-500 dark:text-gray-400 mb-8 font-light leading-relaxed max-w-md">
                    {/* @ts-ignore */} <T> Create your student profile to unlock exclusive insights and discover your potential. </T> </p>

                  {affiliatorName && (
                    <div className="flex items-center gap-3 p-4 mb-8 bg-brand-green/5 border border-brand-green/20 rounded-2xl text-brand-dark-primary dark:text-white animate-fade-in shadow-sm">
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

                  <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5 notranslate" noValidate>


                    {/* Name & Gender */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-5">
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
                              className={`flex-1 text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${formData.gender === g.value
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
                              <span className={`text-[10.5px] font-bold transition-colors duration-300 ${check.valid ? 'text-brand-green' : 'text-gray-400'}`}>
                                <T>{check.label}</T>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Academic Details - Simplified */}
                    <div className="pt-2 space-y-5 relative z-20">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">{/* @ts-ignore */} <T>Academic Details</T> </h3>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                    <div className="relative z-0 space-y-6">
                      <div className="flex justify-center pt-4">
                        <Turnstile onVerify={handleTurnstileVerify} />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isLoading || Object.keys(formErrors).length > 0 || !turnstileToken}
                        className="h-14 text-lg font-bold shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 transition-all transform hover:-translate-y-0.5 rounded-full disabled:opacity-50"
                      >
                        {isLoading ? <T>Processing...</T> : <T>Register and Pay</T>}
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


              {/* Mobile View Info Section (Bottom of Page now) */}
              <div className="block lg:hidden mt-12 pt-12 border-t border-gray-100 dark:border-white/10">
                {/* Student Photo */}
                <div className="w-full max-w-[380px] mx-auto mb-8 relative">
                  <img
                    src="/hero-new.png"
                    alt="Student"
                    className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                  />
                </div>

                <div className="mt-4">
                  <MobileHowItWorksCarousel />
                </div>
              </div>



            </div>

            {/* Right Side - Visual Section (Sticky Full Height) */}
            <div className="hidden lg:block w-1/2 bg-gray-50 dark:bg-[#1D1D1D] transition-colors duration-300 border-l border-gray-100 dark:border-white/5 relative">
              <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Subtle Dots Background Pattern */}
                <div className="absolute inset-0 dark:hidden opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute inset-0 hidden dark:block opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                {/* Minimal Glow Blobs */}
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

                {/* Primary Feature Image */}
                <div className="w-full max-w-[700px] mx-auto relative z-10 px-8 2xl:px-12 transition-transform duration-700 hover:scale-105 group">
                  <img
                    src="/hero-new.png"
                    alt="OriginBI Student Mapping"
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl group-hover:drop-shadow-[0_20px_50px_rgba(30,211,106,0.15)] transition-all duration-700"
                    draggable={false}
                  />
                </div>

                {/* Small Anchor Tag */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center z-20">
                  <div className="px-5 py-2 rounded-full border border-gray-200 dark:border-brand-dark-tertiary bg-white/50 dark:bg-brand-dark-tertiary/50 backdrop-blur-md shadow-sm">
                    <span className="text-xs font-bold tracking-widest uppercase text-brand-dark-primary dark:text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                      {/* @ts-ignore */} <T> AI-Powered Career Discovery </T>
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Hide original steps on mobile since we have the carousel at the top */}
          <div className="hidden lg:block">
            <RegisterSteps />
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div>{/* @ts-ignore */} <T>Loading...</T> </div>}>
      <RegisterPageContent />
    </React.Suspense>
  );
}





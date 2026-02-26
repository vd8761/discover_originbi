"use client";

import React, { useState } from "react";
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
import RegistrationInfo from "@/components/sections/RegistrationInfo";
import MobileHowItWorksCarousel from "@/components/sections/MobileHowItWorksCarousel";
import { registerStudent, validateStudent, validateReferralCode } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { getEnabledBoards } from "@/lib/constants";
import { T } from "@/contexts/LanguageContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function RegisterPageContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [referralValidationStatus, setReferralValidationStatus] = useState<'valid' | 'invalid' | 'checking' | null>(null);
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
    schoolLevel: "",
    currentYear: "",
    stream: "",
    studentBoard: "",
    referralCode: "",
  });

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

    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.email.trim()) errors.email = "Required";
    if (!formData.mobile.trim()) errors.mobile = "Mobile number required";
    if (!formData.studentBoard) errors.studentBoard = "Required";
    if (!formData.schoolLevel) errors.schoolLevel = "Required";

    if (formData.schoolLevel === "HSC") {
      if (!formData.stream) errors.stream = "Required";
      if (!formData.currentYear) errors.currentYear = "Required";
      else if (formData.currentYear !== "1" && formData.currentYear !== "2") {
        errors.currentYear = "Must be 1 or 2";
      }
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = async () => {
    // Only validate if we have at least one field filled to avoid unnecessary calls.
    if (!formData.email && !formData.mobile) return;

    try {
      // Clear previous API error before validating
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.apiError;
        return newErrors;
      });

      const result = await validateStudent({
        email: formData.email,
        mobile_number: formData.mobile,
        country_code: formData.countryCode,
      });

      if (result && !result.isValid) {
        setFormErrors(prev => ({ ...prev, apiError: result.message }));
      }

    } catch (error: any) {
      console.error("Validation Error:", error);
      setFormErrors(prev => ({ ...prev, apiError: error.message || "User validation failed." }));
    }
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'schoolLevel' && value !== 'HSC' ? { stream: '', currentYear: '' } : {})
    }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  React.useEffect(() => {
    const refCode = searchParams.get('ref');

    // If ?ref= param exists but is empty/whitespace, redirect to base register URL
    if (searchParams.has('ref') && (!refCode || !refCode.trim())) {
      router.replace('/register');
      return;
    }

    if (refCode && refCode.trim()) {
      setReferralValidationStatus('checking');
      validateReferralCode(refCode.trim())
        .then(() => {
          setReferralValidationStatus('valid');
          setFormData(prev => ({ ...prev, referralCode: refCode.trim() }));
        })
        .catch((err) => {
          console.error("Invalid referral code:", err);
          setReferralValidationStatus('invalid');
        });
    }
  }, [searchParams, router]);

  const handleClearInvalidReferral = () => {
    router.replace('/register');
    setReferralValidationStatus(null);
  };

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
  ];

  const schoolLevelOptions = [
    { value: "SSLC", label: "SSLC" },
    { value: "HSC", label: "HSC" },
  ];

  const streamOptions = [
    { value: "SCIENCE", label: "Science" },
    { value: "COMMERCE", label: "Commerce" },
    { value: "HUMANITIES", label: "Humanities" },
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
        setFormErrors(prev => ({ ...prev, apiError: validationResult.message || "User validation failed." }));
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
            const registerResponse = await registerStudent({
              full_name: formData.name,
              email: formData.email,
              mobile_number: formData.mobile,
              country_code: formData.countryCode,
              password: formData.password,
              gender: formData.gender,
              program_code: 'SCHOOL_STUDENT',
              school_level: formData.schoolLevel,
              school_stream: formData.schoolLevel === 'HSC' ? formData.stream : undefined,
              student_board: formData.studentBoard,
              referral_code: formData.referralCode || undefined,
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
          window.location.href = loginUrl;
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

              {/* Mobile View Info Section (Top of Page) */}
              <div className="block lg:hidden mb-8 border-b border-gray-100 dark:border-white/10 pb-8">
                {/* Student Photo */}
                <div className="w-full max-w-[380px] mx-auto mb-8 relative">
                  <img
                    src="/hero-new.png"
                    alt="Student"
                    className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                  />
                </div>

                {/* Watch Video Links (Mobile Only) */}
                <div className="flex gap-3 justify-center mb-8 px-2 max-w-[420px] mx-auto">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1 gap-2 border-brand-green/30 text-brand-dark-primary dark:text-white hover:bg-brand-green/5 rounded-2xl h-12"
                    onClick={() => window.open('https://www.youtube.com/watch?v=4luQSZLsZUk', '_blank')}
                  >
                    <span className="material-symbols-outlined !text-[20px] text-brand-green flex items-center justify-center">{/* @ts-ignore */} <T>play_circle</T> </span>
                    {/* @ts-ignore */} <T> Watch in Tamil </T> </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1 gap-2 border-brand-green/30 text-brand-dark-primary dark:text-white hover:bg-brand-green/5 rounded-2xl h-12"
                    onClick={() => window.open('https://www.youtube.com/watch?v=Z2ZkryASFi0', '_blank')}
                  >
                    <span className="material-symbols-outlined !text-[20px] text-brand-green flex items-center justify-center">{/* @ts-ignore */} <T>play_circle</T> </span>
                    {/* @ts-ignore */} <T> Watch in English </T> </Button>
                </div>

                <RegistrationInfo className="" />

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                  <MobileHowItWorksCarousel />
                </div>
              </div>

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
                    {/* @ts-ignore */} <T> Your account has been created. Redirecting you to the login page... </T> </p>
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

                  <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5 notranslate">


                    {/* Name & Gender */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-5">
                      <Input
                        label="Full Name"
                        name="name"
                        required
                        placeholder="E.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
                      />

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-4">
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
                              {g.label}
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
                      className="bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
                    />

                    {/* Mobile Number */}
                    <MobileInput
                      label="Mobile Number"
                      required
                      countryCode={formData.countryCode}
                      phoneNumber={formData.mobile}
                      onCountryChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                      onPhoneChange={(num) => setFormData(prev => ({ ...prev, mobile: num }))}
                      error={formErrors.mobile}
                      onBlur={handleBlur}
                      className="bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full transition-all h-12"
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
                      className="bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all h-12"
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

                    {/* Academic Details - Simplified */}
                    <div className="pt-2 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">{/* @ts-ignore */} <T>Academic Details</T> </h3>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10"></div>
                      </div>

                      <div className={`grid gap-5 ${formData.schoolLevel === 'HSC' ? 'sm:grid-cols-3' : 'sm:grid-cols-1'}`}>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-4">
                            {/* @ts-ignore */} <T> Student Board </T> <span className="text-brand-red">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {getEnabledBoards().map((b) => (
                              <button
                                key={b.value}
                                type="button"
                                onClick={() => handleSelectChange("studentBoard", b.value)}
                                className={`h-12 text-xs md:text-sm font-bold uppercase tracking-wide rounded-full transition-all duration-300 border ${formData.studentBoard === b.value
                                  ? "bg-brand-green text-white border-brand-green shadow-md"
                                  : "bg-white dark:bg-brand-dark-secondary text-gray-500 dark:text-gray-400 border-gray-200 dark:border-brand-dark-tertiary hover:border-brand-green hover:text-brand-green"
                                  }`}
                              >
                                {b.label}
                              </button>
                            ))}
                          </div>
                          {formErrors.studentBoard && <p className="text-red-500 text-xs ml-4 mt-1">{formErrors.studentBoard}</p>}
                        </div>

                        <CustomSelect
                          label="School Level"
                          required
                          options={schoolLevelOptions}
                          value={formData.schoolLevel}
                          onChange={(val) => handleSelectChange("schoolLevel", val)}
                          placeholder="Select Grade"
                          buttonClassName="h-12 bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all"
                        />

                        {formData.schoolLevel === 'HSC' && (
                          <>
                            <CustomSelect
                              label="Stream"
                              required
                              options={streamOptions}
                              value={formData.stream}
                              onChange={(val) => handleSelectChange("stream", val)}
                              placeholder="Select Stream"
                              buttonClassName="h-12 bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all"
                              className="animate-fade-in"
                            />
                            <Input
                              type="text"
                              label="Current Level"
                              name="currentYear"
                              required
                              placeholder="1 or 2"
                              value={formData.currentYear}
                              error={formErrors.currentYear}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                if (val.length > 1) return;
                                setFormData(prev => ({ ...prev, currentYear: val }));

                                if (val && val !== "1" && val !== "2") {
                                  setFormErrors(prev => ({ ...prev, currentYear: "Must be 1 or 2" }));
                                } else {

                                  if (formErrors.currentYear) {
                                    setFormErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors.currentYear;
                                      return newErrors;
                                    });
                                  }
                                }
                              }}
                              className="animate-fade-in h-12 bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-brand-dark-tertiary focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 rounded-full px-6 transition-all"
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {formErrors.apiError && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm flex items-center gap-3 border border-red-100 dark:border-red-900/30">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {formErrors.apiError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      disabled={isLoading || Object.keys(formErrors).length > 0}
                      className="h-14 text-lg font-bold shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 transition-all transform hover:-translate-y-0.5 rounded-full mt-6"
                    >
                      {isLoading ? "Processing..." : "Register and Pay"}
                    </Button>

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

            {/* Right Side - Visual Section (Normal flow) */}
            <div className="hidden lg:block w-1/2 px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] bg-gray-50 dark:bg-[#1E1E1E] transition-colors duration-300 border-l border-gray-100 dark:border-white/5">
              <div className="flex flex-col justify-center items-center pb-12 pt-[100px]">
                {/* Student Photo Desktop */}
                <div className="w-full max-w-[500px] mx-auto mb-8 relative px-10">
                  <img
                    src="/hero-new.png"
                    alt="Student"
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Watch Video Links (Desktop) */}
                <div className="flex gap-3 justify-center mb-8 px-8 w-full max-w-[600px] mx-auto">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1 gap-2 border-brand-green/30 text-brand-dark-primary dark:text-white hover:bg-brand-green/5 bg-white dark:bg-brand-dark-secondary rounded-2xl h-12"
                    onClick={() => window.open('https://www.youtube.com/watch?v=4luQSZLsZUk', '_blank')}
                  >
                    <span className="material-symbols-outlined !text-[20px] text-brand-green flex items-center justify-center">{/* @ts-ignore */} <T>play_circle</T> </span>
                    {/* @ts-ignore */} <T> Watch in Tamil </T> </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1 gap-2 border-brand-green/30 text-brand-dark-primary dark:text-white hover:bg-brand-green/5 bg-white dark:bg-brand-dark-secondary rounded-2xl h-12"
                    onClick={() => window.open('https://www.youtube.com/watch?v=Z2ZkryASFi0', '_blank')}
                  >
                    <span className="material-symbols-outlined !text-[20px] text-brand-green flex items-center justify-center">{/* @ts-ignore */} <T>play_circle</T> </span>
                    {/* @ts-ignore */} <T> Watch in English </T> </Button>
                </div>
                <RegistrationInfo className="!pt-4 !pb-0 w-full" />
              </div>
            </div>

          </div>

          {/* Hide original steps on mobile since we have the carousel at the top */}
          <div className="hidden lg:block">
            <RegisterSteps />
          </div>
        </div>
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





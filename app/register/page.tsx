"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/CustomSelect";
import MobileInput from "@/components/ui/MobileInput";
import RegisterSteps from "@/components/sections/RegisterSteps";

export default function RegisterPage() {
  const { theme } = useTheme();
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
    groupName: "",
    stream: "",
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

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }
  ];
  const activeIndex = genderOptions.findIndex(opt => opt.value === formData.gender);

  const schoolLevelOptions = [
    { value: "SSLC", label: "SSLC" },
    { value: "HSC", label: "HSC" },
  ];

  const streamOptions = [
    { value: "SCIENCE", label: "Science" },
    { value: "COMMERCE", label: "Commerce" },
    { value: "HUMANITIES", label: "Humanities" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-brand-dark-primary transition-colors duration-500 font-sans">
      {/* GLOBAL BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-green/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute bottom-[0%] right-[-5%] w-[35%] h-[35%] bg-emerald-400/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal" />
      </div>

      <Header />

      <main className="relative z-10 w-full flex-1">
        {/* Top Section: Form & Visual */}
        <div className="min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center pt-24 lg:pt-32 pb-12">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-[clamp(24px,8.33vw,160px)] grid xl:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-stretch w-full">

            {/* Left Column: Form Section */}
            <div className="flex flex-col relative z-10 min-h-full">
              <div className="text-left w-full mb-8 lg:mb-10">
                <p className="text-[11px] lg:text-[12px] tracking-[0.2em] text-brand-green font-bold mb-3 flex items-center gap-2">
                  Student Registration
                </p>
                <h1 className="font-sans font-semibold text-black dark:text-white tracking-tight leading-[1.1] mb-3 text-[clamp(24px,2.5vw,40px)]">
                  Create your student profile
                </h1>
                <p className="font-sans text-brand-text-light-secondary dark:text-brand-text-secondary font-normal text-[clamp(13px,1vw,16px)] leading-relaxed max-w-[480px]">
                  Join thousands of students discovering their path to success. Fill in the details below to unlock your assessment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-6 max-w-[580px]">
                <div className="grid sm:grid-cols-[1.2fr_1fr] gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    required
                    placeholder="E.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full bg-white dark:bg-brand-dark-tertiary rounded-full p-1.5 border border-brand-light-tertiary dark:border-white/5 h-[clamp(54px,3.5vw,62px)] flex items-center shadow-sm">
                      {/* Sliding Indicator */}
                      <div
                        className="absolute top-1.5 bottom-1.5 bg-brand-green rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg shadow-brand-green/20"
                        style={{
                          left: `calc(6px + (${activeIndex} * (100% - 12px) / 3))`,
                          width: `calc((100% - 12px) / 3)`
                        }}
                      />

                      {genderOptions.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, gender: g.value }))}
                          className={`relative z-10 flex-1 text-[11px] tracking-widest transition-colors duration-300 font-bold uppercase ${formData.gender === g.value ? "text-white" : "text-brand-text-light-secondary dark:text-brand-text-secondary hover:text-black dark:hover:text-white"}`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Input
                  type="email"
                  label="Email Address"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <MobileInput
                    label="Mobile Number"
                    required
                    countryCode={formData.countryCode}
                    phoneNumber={formData.mobile}
                    onCountryChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                    onPhoneChange={(num) => setFormData(prev => ({ ...prev, mobile: num }))}
                    error={formErrors.mobile}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    name="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    error={formErrors.password}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer flex items-center transition-colors"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-5 w-5 text-brand-green" />
                        ) : (
                          <EyeOffIcon className="h-5 w-5 text-brand-green" />
                        )}
                      </button>
                    }
                  />
                </div>

                <Input
                  label="Group Name"
                  name="groupName"
                  placeholder="Enter the Group Name"
                  value={formData.groupName}
                  onChange={handleChange}
                />

                <div className={`grid gap-5 ${formData.schoolLevel === 'HSC' ? 'sm:grid-cols-3' : 'sm:grid-cols-1'}`}>
                  <CustomSelect
                    label="School Level"
                    required
                    options={schoolLevelOptions}
                    value={formData.schoolLevel}
                    onChange={(val) => handleSelectChange("schoolLevel", val)}
                    placeholder="Select Grade"
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
                        className="animate-fade-in"
                      />
                    </>
                  )}
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    className="shadow-xl shadow-brand-green/20 h-[clamp(54px,3.5vw,64px)] text-[16px] font-bold tracking-wide"
                  >
                    Proceed to Secure Payment
                  </Button>

                  <p className="text-center font-sans text-[14px] text-brand-text-light-secondary dark:text-brand-text-secondary">
                    Already registered?{" "}
                    <a href="https://mind.originbi.com/student/login" className="text-brand-green font-bold hover:underline underline-offset-4 decoration-2">
                      Log in to your account
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Visual Section */}
            <div className="hidden xl:flex flex-col items-stretch justify-stretch h-full">
              <div className="w-full h-full relative rounded-[48px] overflow-hidden flex flex-col items-center justify-center p-12 text-center group">
                {/* Full-bleed Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/Slider.png"
                    alt="Student Dashboard"
                    className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none transition-all duration-[3s] group-hover:scale-[1.02]"
                  />
                  {/* Bottom gradient to blend with the background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent dark:from-brand-dark-primary dark:via-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RegisterSteps />
      </main>

      <Footer />
    </div>
  );
}





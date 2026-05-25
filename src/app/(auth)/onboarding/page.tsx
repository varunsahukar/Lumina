"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  FileCheck2,
  Video,
  Target,
  CheckCircle2,
  AlertCircle,
  Camera,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Multi-step state: 1 = KYC, 2 = IPV Liveness, 3 = Risk Profiling, 4 = eSign & Complete
  const [step, setStep] = useState(1);
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Step 2 liveness state
  const [livenessSuccess, setLivenessSuccess] = useState(false);
  const [capturing, setCapturing] = useState(false);

  // Step 3 Risk profiling answers
  const [horizon, setHorizon] = useState("");
  const [objective, setObjective] = useState("");
  const [reaction, setReaction] = useState("");

  const handleSendOtp = () => {
    if (aadhaar.length < 12) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar Card number.",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent Successfully",
      description: "SMS OTP sent to mobile linked with Aadhaar card (+91 ******8480).",
    });
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) {
      toast({
        title: "Verification Failed",
        description: "Please enter the 6-digit OTP code.",
        variant: "destructive",
      });
      return;
    }
    setOtpVerified(true);
    toast({
      title: "UIDAI OTP Verified",
      description: "Profile matched and verified via Digilocker consent vault.",
    });
  };

  const handleCaptureLiveness = () => {
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setLivenessSuccess(true);
      toast({
        title: "Liveness Verification Verified",
        description: "Geotag captured: 12.9716° N, 77.5946° E. Liveness score: 99.4%",
      });
    }, 2000);
  };

  const calculateRiskCategory = () => {
    let score = 0;
    if (horizon === "3-5y") score += 2;
    if (horizon === "5y+") score += 4;
    if (objective === "growth") score += 2;
    if (objective === "speculative") score += 4;
    if (reaction === "hold") score += 2;
    if (reaction === "buy-more") score += 4;

    if (score <= 3) return "CONSERVATIVE";
    if (score <= 7) return "MODERATE";
    return "AGGRESSIVE";
  };

  const handleCompleteOnboarding = () => {
    toast({
      title: "Onboarding Complete!",
      description: "Your eKYC has been matched with CVL-KRA. Welcome to LuminaVest!",
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Unified onboarding wizard container */}
      <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10">
        
        {/* Wizard Master Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-850 pb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-400 stroke-[2]" />
              <span className="font-extrabold text-sm tracking-wide bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                LuminaVest Investor Onboarding
              </span>
            </div>
            <Badge variant="outline" className="border-slate-800 text-[10px] text-slate-450 font-bold px-2 py-0.5 rounded-md">
              KRA eKYC Verified
            </Badge>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 1, label: "KYC", icon: FileCheck2 },
              { id: 2, label: "IPV", icon: Video },
              { id: 3, label: "Risk", icon: Target },
              { id: 4, label: "eSign", icon: CheckCircle2 },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex flex-col items-center space-y-1.5">
                  <div
                    className={`p-2 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                        : isCompleted
                        ? "bg-slate-900 border-emerald-500/25 text-emerald-450"
                        : "bg-slate-950/60 border-slate-850 text-slate-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-[9px] font-bold tracking-wide uppercase ${
                      isActive ? "text-slate-200" : isCompleted ? "text-emerald-500" : "text-slate-650"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: Aadhaar & PAN Digilocker Consent */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                Step 1: KYC PAN & Aadhaar Matching
              </h2>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Enter your permanent account credentials. We instantly verify details directly against income tax departments and UIDAI registries.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan" className="text-xs font-semibold text-slate-400">
                  PAN Card Number (10 Alphanumeric characters)
                </Label>
                <Input
                  id="pan"
                  placeholder="e.g. ABCDE1234F"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  maxLength={10}
                  className="bg-slate-950 border-slate-800 text-xs text-slate-200 rounded-xl focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-xs font-semibold text-slate-400">
                  Aadhaar Card Number (12 digits)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="aadhaar"
                    placeholder="e.g. 5432 1098 7654"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
                    maxLength={12}
                    className="bg-slate-950 border-slate-800 text-xs text-slate-200 rounded-xl focus:ring-emerald-500 flex-1"
                  />
                  {!otpVerified && (
                    <Button
                      onClick={handleSendOtp}
                      disabled={otpSent}
                      className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs rounded-xl"
                    >
                      {otpSent ? "Resend" : "Send OTP"}
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-2.5 p-4 bg-slate-950 border border-slate-850 rounded-2xl animate-slide-up">
                  <Label htmlFor="otp" className="text-xs font-bold text-slate-400">
                    Aadhaar Linked SMS OTP Code (6 digits)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      maxLength={6}
                      className="bg-slate-900 border-slate-800 text-xs text-slate-200 rounded-xl focus:ring-emerald-500 flex-1"
                    />
                    <Button
                      onClick={handleVerifyOtp}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-xl"
                    >
                      Verify OTP
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3">
              <Button
                onClick={() => setStep(2)}
                disabled={!otpVerified || pan.length < 10}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold text-xs px-5 py-4 h-auto rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] flex items-center"
              >
                Proceed to IPV
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: In-Person Verification Camera Simulation */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                Step 2: In-Person Liveness IPV
              </h2>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                SEBI regulations mandate In-Person Verification. Allow camera access, and capture a 3-second snapshot reading the verification digits displayed.
              </p>
            </div>

            {/* Liveness camera viewfinder box */}
            <div className="relative h-56 bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              {livenessSuccess ? (
                // Liveness verified overlay
                <div className="space-y-2 text-center animate-scale-up">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">Liveness Validation Successful</h4>
                  <p className="text-[9px] text-slate-550 flex items-center justify-center">
                    <MapPin className="h-3.5 w-3.5 text-slate-550 mr-1" />
                    Geotagged: Bengaluru, KA, India
                  </p>
                </div>
              ) : capturing ? (
                // Processing loop
                <div className="space-y-3">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <span className="text-xs text-slate-400 font-bold">Scanning liveness features...</span>
                </div>
              ) : (
                // Circular viewfinder box
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center relative">
                    <Camera className="h-7 w-7 text-slate-650" />
                    <div className="absolute -top-1 -right-1 bg-emerald-500 p-1 rounded-full text-slate-950">
                      <Lock className="h-2.5 w-2.5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-550 font-bold block">
                      Read aloud security code:
                    </span>
                    <span className="text-sm font-extrabold tracking-widest text-emerald-400">
                      4 8 2 1
                    </span>
                  </div>
                </div>
              )}
            </div>

            {!livenessSuccess && !capturing && (
              <Button
                onClick={handleCaptureLiveness}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl py-5"
              >
                Start Verification Scan
              </Button>
            )}

            <div className="flex justify-between pt-3">
              <Button
                onClick={() => setStep(1)}
                variant="ghost"
                className="text-slate-450 hover:text-slate-200 font-bold text-xs rounded-xl flex items-center"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                Back
              </Button>

              <Button
                onClick={() => setStep(3)}
                disabled={!livenessSuccess}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold text-xs px-5 py-4 h-auto rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] flex items-center"
              >
                Risk Profiling
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: SEBI-Compliant Risk Profiling */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                Step 3: Investor Risk Diagnostics
              </h2>
              <p className="text-[11px] text-slate-550 leading-relaxed">
                SEBI mandates wealth platforms evaluate investor risk profiles to ensure fund products match personal holding tolerances.
              </p>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400">
                  1. What is your expected investment horizon timeline?
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "under-1y", label: "Under 1 Year" },
                    { val: "3-5y", label: "3 - 5 Years" },
                    { val: "5y+", label: "5+ Years" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setHorizon(item.val)}
                      className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold text-center ${
                        horizon === item.val
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-950/60 border-slate-850 text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400">
                  2. What is your primary investment goal?
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "capital", label: "Capital Protection" },
                    { val: "growth", label: "Aggressive Growth" },
                    { val: "speculative", label: "High CAGR Wealth" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setObjective(item.val)}
                      className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold text-center ${
                        objective === item.val
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-950/60 border-slate-850 text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400">
                  3. If your holdings drop 20% in a market correction, you will:
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "sell", label: "Panic Sell" },
                    { val: "hold", label: "Hold Position" },
                    { val: "buy-more", label: "Buy More Units" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setReaction(item.val)}
                      className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold text-center ${
                        reaction === item.val
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-950/60 border-slate-850 text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <Button
                onClick={() => setStep(2)}
                variant="ghost"
                className="text-slate-450 hover:text-slate-200 font-bold text-xs rounded-xl flex items-center"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                Back
              </Button>

              <Button
                onClick={() => setStep(4)}
                disabled={!horizon || !objective || !reaction}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold text-xs px-5 py-4 h-auto rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] flex items-center"
              >
                Proceed to Sign
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: eSign & Completion Summary */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in text-center py-2">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-md font-extrabold text-slate-200 tracking-wide uppercase">
                Consolidated AOF Digitally Signed
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Account Opening Form (AOF) successfully compiled and e-signed via Digilocker CDSL NSDL registries.
              </p>
            </div>

            {/* Account diagnostics summary sheet */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-left text-xs max-w-sm mx-auto space-y-3">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-semibold">User Role</span>
                <span className="text-slate-300 font-extrabold">Retail Investor</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-semibold">Risk Rating Profile</span>
                <span className="text-emerald-400 font-extrabold tracking-wide uppercase">
                  {calculateRiskCategory()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">KRA Verification</span>
                <span className="text-emerald-400 font-bold flex items-center">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-400 fill-emerald-500/10" />
                  Active (Verified)
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-5 border-t border-slate-900/60 max-w-sm mx-auto">
              <Button
                onClick={() => setStep(3)}
                variant="ghost"
                className="text-slate-450 hover:text-slate-200 font-bold text-xs rounded-xl flex items-center"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                Back
              </Button>

              <Button
                onClick={handleCompleteOnboarding}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 hover:text-slate-950 font-extrabold text-xs px-6 py-4 h-auto rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

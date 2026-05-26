"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

// Form Validation Schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Form Hooks
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // Handle Login Submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Invalid email or password. Please try again.",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully authenticated. Redirecting to your dashboard...",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the authentication server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register Submission
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message || "An error occurred during sign up.",
        });
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Please sign in with your new credentials.",
        });
        setActiveTab("login");
        loginForm.setValue("email", data.email);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: "Could not complete account creation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* Corner Logo Redirect */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center hover:opacity-80 transition-opacity">
        <span className="font-bold text-xl tracking-tight text-white">
          Lumina<span className="text-emerald-400">Vest</span>
        </span>
      </Link>

      {/* Premium Ambient Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none animate-scrollRightToLeft" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl ">
            <ShieldCheck className="h-8 w-8 text-slate-950 stroke-[2]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            LuminaVest
          </h1>
          <p className="text-[#a3a3a3] text-sm text-center">
            AI-powered SEBI-compliant wealth intelligence
          </p>
        </div>

        {/* Glassmorphic Tabs Card */}
        <Card className="border-[#1a1a1a] bg-black ">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2 bg-[#0a0a0a] border border-[#1a1a1a] p-1">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/10 data-[state=active]:to-emerald-500/20 data-[state=active]:text-emerald-400 border-none transition-all duration-300 text-xs py-2"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-blue-500/20 data-[state=active]:text-blue-400 border-none transition-all duration-300 text-xs py-2"
                >
                  Create Account
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* SIGN IN VIEW */}
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <CardContent className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-[#a3a3a3] text-xs font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...loginForm.register("email")}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-xs text-rose-500">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="login-password" className="text-[#a3a3a3] text-xs font-semibold">
                        Password
                      </Label>
                      <a href="#" className="text-xs text-emerald-400 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...loginForm.register("password")}
                      />
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-xs text-rose-500">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col pt-4 space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold transition-all duration-300 "
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-950" />
                    ) : (
                      <>
                        Sign In <ArrowRight className="ml-2 h-4 w-4 text-slate-950" />
                      </>
                    )}
                  </Button>

                  <div className="relative w-full flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#1a1a1a]" />
                    </div>
                    <span className="relative z-10 px-3 bg-black text-[10px] text-[#a3a3a3] uppercase tracking-widest">
                      Or Connect With
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => signIn("google")}
                    className="w-full border-[#1a1a1a] bg-black text-[#a3a3a3] hover:bg-[#0a0a0a] hover:text-white"
                  >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google Workspace
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* CREATE ACCOUNT VIEW */}
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <CardContent className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name" className="text-[#a3a3a3] text-xs font-semibold">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...registerForm.register("name")}
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="text-xs text-rose-500">{registerForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-[#a3a3a3] text-xs font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...registerForm.register("email")}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-xs text-rose-500">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-[#a3a3a3] text-xs font-semibold">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...registerForm.register("password")}
                      />
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-xs text-rose-500">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm" className="text-[#a3a3a3] text-xs font-semibold">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#a3a3a3]" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-black border-[#1a1a1a] text-white placeholder:text-[#a3a3a3] focus-visible:ring-emerald-500/50"
                        {...registerForm.register("confirmPassword")}
                      />
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-rose-500">{registerForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold transition-all duration-300 "
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 h-4 w-4 text-white" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

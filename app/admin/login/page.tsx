"use client"; // Required for hooks and interactivity

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js equivalent of useNavigate
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Adjust path as needed (e.g., from ../ to @/)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Login() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLogin, setIsLogin] = useState(true); // Default to login mode

    // Destructure more from store for useEffect
    const { loading, loginUser, registerUser, user, isAuthenticated } =
        useAuthStore();

    // Form state: Add conditional reset for name on toggle
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // NEW: Reactive redirect based on auth state and role
    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectPath =
                user.role.name === "Admin" ? "/admin/dashboard" : "/"; // Adjust '/' to your home path if needed (e.g., '/home')
            router.push(redirectPath);
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let successMessage: string;
            if (isLogin) {
                // Login
                await loginUser({
                    email: formData.email,
                    password: formData.password,
                });
                successMessage = "Welcome back! You have successfully logged in.";
            } else {
                // FIXED: Call registerUser (was missing)
                await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                successMessage = "Your account has been created successfully.";
            }

            // REMOVED: router.push here—now handled in useEffect for reliability
            // Toast will show immediately after API success
            toast({
                title: isLogin ? "Welcome back!" : "Account created!",
                description: successMessage,
            });

            // Optional: Clear form on success (before redirect)
            setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            let errorMessage = isLogin ? "Login failed" : "Registration failed";
            if (error && typeof error === "object" && "response" in error) {
                const err = error as { response?: { data?: { message?: string } } };
                errorMessage = err.response?.data?.message || errorMessage;
            }
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // NEW: Toggle login/register mode and reset name if switching to login
    const toggleMode = () => {
        setIsLogin(!isLogin);
        if (isLogin) {
            setFormData({ ...formData, name: "" }); // Clear name when switching to login
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
                <div
                    className="hidden lg:block relative"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=1200&fit=crop)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
                        <GraduationCap className="h-16 w-16 mb-6" />
                        <h2 className="text-4xl font-bold mb-4 text-center">
                            Welcome to School for Schools
                        </h2>
                        <p className="text-xl text-center max-w-md">
                            Join thousands of educators transforming the future of education
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8 bg-muted/30">
                    <Card className="w-full max-w-md border-2">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-3xl font-bold text-center">
                                {isLogin ? "Login" : "Create Account"}
                            </CardTitle>
                            <CardDescription className="text-center">
                                {isLogin
                                    ? "Enter your credentials to access your account"
                                    : "Fill in your information to get started"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* NEW: Name input for register mode */}
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {isLogin && (
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded" />
                                            <span className="text-muted-foreground">Remember me</span>
                                        </label>
                                        <a
                                            href="#"
                                            className="text-primary hover:underline hover:text-gray-700"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {isLogin ? "Signing In..." : "Creating..."}
                                        </div>
                                    ) : isLogin ? (
                                        "Sign In"
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>

                                {/* NEW: Toggle button between login/register */}
                                {/* <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline"
                  >
                    {isLogin
                      ? "Don't have an account? Create one"
                      : "Already have an account? Sign in"}
                  </button>
                </div> */}

                                {/* Commented divider can be uncommented if adding social login later */}
                                {/* <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div> */}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

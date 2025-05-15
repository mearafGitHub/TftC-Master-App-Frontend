
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-5xl px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Welcome Message */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left animate-in">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to TftC Master Portal
          </h1>
          <p className="text-xl text-muted-foreground">
          Your unified platform providing authenticated access to ditial zones and portals built by TftC Tools for the Commons
          </p>
          <div className="bg-baground backdrop-blur-sm border border-primary/10">
            <p className="text-xl">
              Sign in to access your applications and services.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <AuthLayout
            title="Sign in to TftC"
            description="Enter your credentials to access your account"
            footer={
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-primary hover:underline">
                  Create account
                </Link>
              </div>
            }
          >
            <LoginForm />
          </AuthLayout>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Tools for the Commons. All rights reserved.
      </div>
    </div>
  );
};

export default Login;

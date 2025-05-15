
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, this would connect to your authentication service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin account
      if (email === "admin@tftc.com" && password === "admin123") {
        localStorage.setItem("tftc-auth", JSON.stringify({
          isAuthenticated: true,
          user: { email, role: "admin" }
        }));
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the Tools for the Commons admin panel!",
        });
        navigate("/admin");
        return;
      }
      
      // Regular user login
      if (email && password) {
        // Store user info in local storage - in real app, use secure tokens
        localStorage.setItem("tftc-auth", JSON.stringify({
          isAuthenticated: true,
          user: { email, role: email.includes("admin") ? "admin" : "user" }
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome to Tools for the Commons!",
        });
        
        // Redirect based on role
        if (email.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;

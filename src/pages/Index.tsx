
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">TftC Master Portal</h1>
          <p className="text-xl text-muted-foreground font-medium">Master Portal for the products of Tools for the Commons</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A unified platform providing authenticated access to the zones and portals built by TftC.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-6 text-lg" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button className="px-8 py-6 text-lg" variant="outline" asChild>
            <Link to="/register">Create an account</Link>
          </Button>
        </div>
        
        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            © 2025 Tools for the Commons. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

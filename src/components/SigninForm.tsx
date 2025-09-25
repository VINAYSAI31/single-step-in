import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signin process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-card border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] shadow-elegant"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Forgot your password?
          </a>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline transition-colors duration-200">
              Sign up
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
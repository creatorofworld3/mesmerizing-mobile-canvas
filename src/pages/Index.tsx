
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the School Management App",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-school-primary to-blue-700 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-school-secondary rounded-full overflow-hidden flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#FFBB33"/>
              <path d="M30 15C24.477 15 20 19.477 20 25V26.5C20 32.023 24.477 36.5 30 36.5C35.523 36.5 40 32.023 40 26.5V25C40 19.477 35.523 15 30 15Z" fill="#333333"/>
              <path d="M30 20C27.5 20 26 22.5 26 25H34C34 22.5 32.5 20 30 20Z" fill="#FFFFFF"/>
              <path d="M35 30.5H25C25 33.5 27.239 36 30 36C32.761 36 35 33.5 35 30.5Z" fill="#FFFFFF"/>
              <path d="M25 42V40C25 38.895 25.895 38 27 38H33C34.105 38 35 38.895 35 40V42L37 44H23L25 42Z" fill="#333333"/>
              <path d="M30 10L34 13H26L30 10Z" fill="#333333"/>
              <path d="M30 6V10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">School Management App</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-school-primary hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Use: username: "parent" and password: "password"</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

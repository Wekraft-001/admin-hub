import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/mockData';
import Logo from '@/assets/AA-LOGO.svg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        toast({
          title: 'Welcome back, Admin',
          description: "Let's make learning impactful.",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Authentication failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-md">
        {/* Logo and Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src={Logo} 
              alt="African Alliance Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to the Learning Portal
          </h1>
          <p className="text-muted-foreground">
            Empowering growth through knowledge and development
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-xl font-semibold text-foreground">
              Admin Portal
            </CardTitle>
            <CardDescription>
              Sign in to manage your learning platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-input focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 border-input focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Demo credentials
              </p>
              <p className="text-center text-xs text-muted-foreground mt-1">
                admin@example.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 African Alliance. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

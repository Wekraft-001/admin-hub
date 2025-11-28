import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Shield } from "lucide-react";
import Logo from "@/assets/AA-LOGO.svg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-500/30">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 flex items-center justify-center">
            {/* <BookOpen className="h-8 w-8 text-primary" /> */}
            <img src={Logo} className="h-[200px]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-black">
            Learning Management System
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional admin dashboard for managing learners and content
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/admin/login")}
          >
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>
                Access the admin dashboard to manage learners, modules, and
                certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Go to Admin Login</Button>
            </CardContent>
          </Card>

          {/* <Card className="hover:shadow-lg transition-shadow hidden">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Learner Portal</CardTitle>
              <CardDescription>
                Coming soon: Access your courses, track progress, and earn
                certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Index;

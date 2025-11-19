import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/AdminLayout';
import { mockStats, mockLearners, mockModules } from '@/lib/mockData';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  PlusCircle,
  Upload,
  BarChart,
  ArrowRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState(mockStats);
  const [recentLearners] = useState(mockLearners.slice(0, 5));
  const [topModules] = useState(mockModules.slice(0, 3));

  const statCards = [
    {
      title: 'Total Learners',
      value: stats.totalLearners,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Modules',
      value: stats.activeModules,
      icon: BookOpen,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Certificates Issued',
      value: stats.certificatesIssued,
      icon: Award,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
          <p className="text-muted-foreground">Let's make learning impactful.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Module
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
              <Button variant="outline">
                <BarChart className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Learners & Top Modules */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent Learners */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Recent Learners</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/users')}
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLearners.map((learner) => (
                  <div key={learner.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{learner.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{learner.name}</p>
                        <p className="text-xs text-muted-foreground">{learner.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={learner.status === 'active' ? 'default' : 'secondary'}>
                        {learner.completionPercentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topModules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.duration}</p>
                      </div>
                      <Badge variant="outline">{module.type}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Completion Rate</span>
                        <span>{module.completionRate}%</span>
                      </div>
                      <Progress value={module.completionRate} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

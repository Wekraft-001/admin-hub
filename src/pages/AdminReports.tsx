import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, BookOpen, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for charts
const learnerProgressData = [
  { month: 'Jan', active: 45, completed: 12, enrolled: 60 },
  { month: 'Feb', active: 52, completed: 18, enrolled: 68 },
  { month: 'Mar', active: 58, completed: 25, enrolled: 75 },
  { month: 'Apr', active: 65, completed: 30, enrolled: 82 },
  { month: 'May', active: 70, completed: 38, enrolled: 90 },
  { month: 'Jun', active: 78, completed: 45, enrolled: 98 },
];

const moduleCompletionData = [
  { name: 'Introduction to Learning', completion: 92, enrolled: 98 },
  { name: 'Advanced Concepts', completion: 78, enrolled: 85 },
  { name: 'Practical Applications', completion: 65, enrolled: 80 },
  { name: 'Expert Techniques', completion: 45, enrolled: 70 },
  { name: 'Final Assessment', completion: 38, enrolled: 65 },
];

const certificateStatusData = [
  { name: 'Issued', value: 145, color: 'hsl(var(--chart-1))' },
  { name: 'Pending', value: 42, color: 'hsl(var(--chart-2))' },
  { name: 'Expired', value: 18, color: 'hsl(var(--chart-3))' },
];

const engagementData = [
  { week: 'Week 1', sessions: 340, avgTime: 45 },
  { week: 'Week 2', sessions: 380, avgTime: 52 },
  { week: 'Week 3', sessions: 420, avgTime: 48 },
  { week: 'Week 4', sessions: 390, avgTime: 55 },
  { week: 'Week 5', sessions: 450, avgTime: 58 },
  { week: 'Week 6', sessions: 480, avgTime: 62 },
];

export default function AdminReports() {
  const [timeRange, setTimeRange] = useState('6months');

  const stats = [
    {
      title: 'Total Enrollments',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Avg. Completion Rate',
      value: '67.8%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Active Modules',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'text-purple-600',
    },
    {
      title: 'Certificates Issued',
      value: '145',
      change: '+18',
      trend: 'up',
      icon: Award,
      color: 'text-amber-600',
    },
  ];

  const handleExport = () => {
    console.log('Exporting reports...');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track learner progress, module performance, and certificate statistics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">from last period</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Tabs */}
        <Tabs defaultValue="learners" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learners">Learner Progress</TabsTrigger>
            <TabsTrigger value="modules">Module Performance</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          {/* Learner Progress Tab */}
          <TabsContent value="learners" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Learner Progress Over Time</CardTitle>
                <CardDescription>
                  Track active learners, enrollments, and course completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={learnerProgressData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="enrolled"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                      name="Enrolled"
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                      name="Active"
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="3"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.6}
                      name="Completed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Module Performance Tab */}
          <TabsContent value="modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Module Completion Rates</CardTitle>
                <CardDescription>Compare enrollment vs completion across modules</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={moduleCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" angle={-15} textAnchor="end" height={100} />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="enrolled" fill="hsl(var(--chart-1))" name="Enrolled" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="completion" fill="hsl(var(--chart-2))" name="Completed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Performing Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {moduleCompletionData
                      .sort((a, b) => (b.completion / b.enrolled) - (a.completion / a.enrolled))
                      .slice(0, 3)
                      .map((module, index) => (
                        <div key={module.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span className="text-sm font-medium">{module.name}</span>
                          </div>
                          <Badge variant="default">
                            {Math.round((module.completion / module.enrolled) * 100)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Modules Needing Attention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {moduleCompletionData
                      .sort((a, b) => (a.completion / a.enrolled) - (b.completion / b.enrolled))
                      .slice(0, 3)
                      .map((module, index) => (
                        <div key={module.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span className="text-sm font-medium">{module.name}</span>
                          </div>
                          <Badge variant="destructive">
                            {Math.round((module.completion / module.enrolled) * 100)}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Distribution</CardTitle>
                  <CardDescription>Current status of all certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={certificateStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {certificateStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {certificateStatusData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificate Issuance Trend</CardTitle>
                  <CardDescription>Certificates issued over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={learnerProgressData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--chart-3))' }}
                        name="Certificates"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">Average Monthly Issuance</div>
                    <div className="text-2xl font-bold">28.5</div>
                    <div className="text-xs text-muted-foreground mt-1">certificates per month</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Engagement Metrics</CardTitle>
                <CardDescription>Track user sessions and average time spent</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="sessions"
                      fill="hsl(var(--chart-1))"
                      name="Sessions"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="avgTime"
                      fill="hsl(var(--chart-2))"
                      name="Avg. Time (min)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Total Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,460</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 6 weeks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Avg. Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">53.3 min</div>
                  <p className="text-xs text-muted-foreground mt-1">Per session average</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Return Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78.4%</div>
                  <p className="text-xs text-muted-foreground mt-1">Users returning weekly</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isAuthenticated, mockLearners, mockModules, type Learner } from '@/lib/mockData';
import {
  Search,
  Filter,
  Download,
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [learners, setLearners] = useState<Learner[]>(mockLearners);
  const [filteredLearners, setFilteredLearners] = useState<Learner[]>(mockLearners);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [completionFilter, setCompletionFilter] = useState<string>('all');
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    let filtered = [...learners];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (learner) =>
          learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          learner.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((learner) => learner.status === statusFilter);
    }

    // Completion filter
    if (completionFilter !== 'all') {
      filtered = filtered.filter((learner) => {
        if (completionFilter === 'high') return learner.completionPercentage >= 75;
        if (completionFilter === 'medium')
          return learner.completionPercentage >= 50 && learner.completionPercentage < 75;
        if (completionFilter === 'low') return learner.completionPercentage < 50;
        return true;
      });
    }

    setFilteredLearners(filtered);
  }, [searchQuery, statusFilter, completionFilter, learners]);

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Learner data is being prepared for download.',
    });
  };

  const handleViewDetails = (learner: Learner) => {
    setSelectedLearner(learner);
    setIsDetailsOpen(true);
  };

  const getCompletionBadgeVariant = (percentage: number) => {
    if (percentage >= 75) return 'default';
    if (percentage >= 50) return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">User Management</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={completionFilter} onValueChange={setCompletionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by completion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Completion</SelectItem>
                  <SelectItem value="high">High (75%+)</SelectItem>
                  <SelectItem value="medium">Medium (50-74%)</SelectItem>
                  <SelectItem value="low">Low (&lt;50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Learners List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Learners ({filteredLearners.length})</CardTitle>
              <Badge variant="outline">{learners.length} Total</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLearners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No learners found matching your criteria.
                </div>
              ) : (
                filteredLearners.map((learner) => (
                  <div
                    key={learner.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleViewDetails(learner)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {learner.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{learner.name}</p>
                          <Badge
                            variant={learner.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {learner.status}
                          </Badge>
                          {learner.certificateIssued && (
                            <Badge variant="outline" className="text-xs">
                              <Award className="mr-1 h-3 w-3" />
                              Certified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{learner.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Enrolled {learner.enrolledDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Active {learner.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right min-w-[120px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {learner.completionPercentage}%
                          </span>
                          <Badge variant={getCompletionBadgeVariant(learner.completionPercentage)}>
                            <TrendingUp className="h-3 w-3" />
                          </Badge>
                        </div>
                        <Progress value={learner.completionPercentage} className="w-24" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learner Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Learner Details</DialogTitle>
            <DialogDescription>
              Complete profile and progress information
            </DialogDescription>
          </DialogHeader>
          {selectedLearner && (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {selectedLearner.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedLearner.name}</h3>
                  <p className="text-muted-foreground">{selectedLearner.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={selectedLearner.status === 'active' ? 'default' : 'secondary'}>
                      {selectedLearner.status}
                    </Badge>
                    {selectedLearner.certificateIssued && (
                      <Badge variant="outline">
                        <Award className="mr-1 h-3 w-3" />
                        Certified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-semibold">{selectedLearner.completionPercentage}%</span>
                    </div>
                    <Progress value={selectedLearner.completionPercentage} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Enrolled Date</p>
                      <p className="font-medium">{selectedLearner.enrolledDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Last Active</p>
                      <p className="font-medium">{selectedLearner.lastActive}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Module Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockModules.map((module, index) => {
                      // Simulate individual module progress based on overall completion
                      const isCompleted = (index + 1) * 25 <= selectedLearner.completionPercentage;
                      const progress = Math.min(
                        100,
                        Math.max(0, selectedLearner.completionPercentage - index * 25)
                      );

                      return (
                        <div key={module.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{module.title}</p>
                              <p className="text-xs text-muted-foreground">{module.duration}</p>
                            </div>
                            <Badge variant={isCompleted ? 'default' : 'outline'}>
                              {isCompleted ? 'Completed' : `${Math.round(progress)}%`}
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;

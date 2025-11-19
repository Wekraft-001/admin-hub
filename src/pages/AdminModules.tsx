import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/AdminLayout';
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
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { mockModules, type Module } from '@/lib/mockData';
import {
  PlusCircle,
  Edit,
  Trash2,
  GripVertical,
  Video,
  FileText,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminModules = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    type: 'text' as 'text' | 'video' | 'quiz',
  });

  const handleCreateModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      type: formData.type,
      order: modules.length + 1,
      completionRate: 0,
    };

    setModules([...modules, newModule]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: 'Module Created',
      description: `${formData.title} has been added successfully.`,
    });
  };

  const handleEditModule = () => {
    if (!selectedModule) return;

    const updatedModules = modules.map((m) =>
      m.id === selectedModule.id
        ? {
            ...m,
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            type: formData.type,
          }
        : m
    );

    setModules(updatedModules);
    setIsEditDialogOpen(false);
    setSelectedModule(null);
    resetForm();
    toast({
      title: 'Module Updated',
      description: `${formData.title} has been updated successfully.`,
    });
  };

  const handleDeleteModule = () => {
    if (!selectedModule) return;

    const updatedModules = modules.filter((m) => m.id !== selectedModule.id);
    setModules(updatedModules);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Module Deleted',
      description: `${selectedModule.title} has been removed.`,
    });
    setSelectedModule(null);
  };

  const openEditDialog = (module: Module) => {
    setSelectedModule(module);
    setFormData({
      title: module.title,
      description: module.description,
      duration: module.duration,
      type: module.type,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (module: Module) => {
    setSelectedModule(module);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      type: 'text',
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newModules = [...modules];
    const draggedItem = newModules[draggedIndex];
    newModules.splice(draggedIndex, 1);
    newModules.splice(index, 0, draggedItem);

    setModules(newModules);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    toast({
      title: 'Order Updated',
      description: 'Module order has been saved.',
    });
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'video':
        return 'default';
      case 'text':
        return 'secondary';
      case 'quiz':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Module Management</h2>
            <p className="text-muted-foreground">Create and organize your learning content</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Module
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modules.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Video Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {modules.filter((m) => m.type === 'video').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {modules.length > 0
                  ? Math.round(
                      modules.reduce((acc, m) => acc + m.completionRate, 0) / modules.length
                    )
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules List */}
        <Card>
          <CardHeader>
            <CardTitle>All Modules</CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag and drop to reorder modules
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {modules.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No modules yet. Create your first module to get started!</p>
                </div>
              ) : (
                modules.map((module, index) => (
                  <div
                    key={module.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-move ${
                      draggedIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        <Badge variant={getTypeBadgeVariant(module.type)}>
                          <span className="flex items-center gap-1">
                            {getModuleIcon(module.type)}
                            {module.type}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Duration: {module.duration}</span>
                        <span>•</span>
                        <span>Completion: {module.completionRate}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog(module);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(module);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Module Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Module</DialogTitle>
              <DialogDescription>
                Add a new learning module to your portal
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Introduction to Safety"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief overview of the module content"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="45 minutes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Module Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'text' | 'video' | 'quiz') =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateModule} disabled={!formData.title}>
                Create Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Module Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Module</DialogTitle>
              <DialogDescription>Update module information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Module Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Module Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'text' | 'video' | 'quiz') =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditModule}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{selectedModule?.title}". This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteModule} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminModules;

import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Download, Eye, Award } from 'lucide-react';
import { mockCertificateTemplates, mockIssuedCertificates, CertificateTemplate, Certificate } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function AdminCertificates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<CertificateTemplate[]>(mockCertificateTemplates);
  const [certificates, setCertificates] = useState<Certificate[]>(mockIssuedCertificates);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<CertificateTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderStyle: 'solid' as 'solid' | 'dashed' | 'double' | 'none',
    includeCompletionDate: true,
    includeSignature: true,
    generationRule: 'automatic' as 'automatic' | 'manual',
    completionThreshold: 100,
    isActive: true,
  });

  const handleCreateTemplate = () => {
    const newTemplate: CertificateTemplate = {
      id: String(templates.length + 1),
      ...templateForm,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setTemplates([...templates, newTemplate]);
    setIsTemplateDialogOpen(false);
    resetTemplateForm();
    toast({
      title: 'Template Created',
      description: 'Certificate template has been created successfully.',
    });
  };

  const handleEditTemplate = () => {
    if (!editingTemplate) return;
    setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...editingTemplate, ...templateForm } : t));
    setIsTemplateDialogOpen(false);
    setEditingTemplate(null);
    resetTemplateForm();
    toast({
      title: 'Template Updated',
      description: 'Certificate template has been updated successfully.',
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: 'Template Deleted',
      description: 'Certificate template has been deleted.',
      variant: 'destructive',
    });
  };

  const openEditDialog = (template: CertificateTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      description: template.description,
      backgroundColor: template.backgroundColor,
      textColor: template.textColor,
      borderStyle: template.borderStyle,
      includeCompletionDate: template.includeCompletionDate,
      includeSignature: template.includeSignature,
      generationRule: template.generationRule,
      completionThreshold: template.completionThreshold,
      isActive: template.isActive,
    });
    setIsTemplateDialogOpen(true);
  };

  const resetTemplateForm = () => {
    setTemplateForm({
      name: '',
      description: '',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      borderStyle: 'solid',
      includeCompletionDate: true,
      includeSignature: true,
      generationRule: 'automatic',
      completionThreshold: 100,
      isActive: true,
    });
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadCertificate = (cert: Certificate) => {
    toast({
      title: 'Download Started',
      description: `Downloading certificate ${cert.certificateNumber}`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Certificates</h1>
            <p className="text-muted-foreground">Manage certificate templates and issued certificates</p>
          </div>
          <Dialog open={isTemplateDialogOpen} onOpenChange={(open) => {
            setIsTemplateDialogOpen(open);
            if (!open) {
              setEditingTemplate(null);
              resetTemplateForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create Certificate Template'}</DialogTitle>
                <DialogDescription>
                  {editingTemplate ? 'Update the certificate template details.' : 'Design a new certificate template with custom styling and rules.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                    placeholder="e.g., Standard Completion"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                    placeholder="Describe when this template should be used"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={templateForm.backgroundColor}
                      onChange={(e) => setTemplateForm({ ...templateForm, backgroundColor: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={templateForm.textColor}
                      onChange={(e) => setTemplateForm({ ...templateForm, textColor: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borderStyle">Border Style</Label>
                  <Select
                    value={templateForm.borderStyle}
                    onValueChange={(value: 'solid' | 'dashed' | 'double' | 'none') =>
                      setTemplateForm({ ...templateForm, borderStyle: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generationRule">Generation Rule</Label>
                  <Select
                    value={templateForm.generationRule}
                    onValueChange={(value: 'automatic' | 'manual') =>
                      setTemplateForm({ ...templateForm, generationRule: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completionThreshold">Completion Threshold (%)</Label>
                  <Input
                    id="completionThreshold"
                    type="number"
                    min="0"
                    max="100"
                    value={templateForm.completionThreshold}
                    onChange={(e) => setTemplateForm({ ...templateForm, completionThreshold: Number(e.target.value) })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeCompletionDate">Include Completion Date</Label>
                  <Switch
                    id="includeCompletionDate"
                    checked={templateForm.includeCompletionDate}
                    onCheckedChange={(checked) =>
                      setTemplateForm({ ...templateForm, includeCompletionDate: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeSignature">Include Signature</Label>
                  <Switch
                    id="includeSignature"
                    checked={templateForm.includeSignature}
                    onCheckedChange={(checked) =>
                      setTemplateForm({ ...templateForm, includeSignature: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active Template</Label>
                  <Switch
                    id="isActive"
                    checked={templateForm.isActive}
                    onCheckedChange={(checked) =>
                      setTemplateForm({ ...templateForm, isActive: checked })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsTemplateDialogOpen(false);
                  setEditingTemplate(null);
                  resetTemplateForm();
                }}>
                  Cancel
                </Button>
                <Button onClick={editingTemplate ? handleEditTemplate : handleCreateTemplate}>
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="issued">Issued Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Award className="h-8 w-8 text-primary" />
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant={template.isActive ? 'default' : 'secondary'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">{template.generationRule}</Badge>
                      <Badge variant="outline">{template.completionThreshold}% threshold</Badge>
                    </div>
                    <div 
                      className="h-32 rounded-md border-2 flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: template.backgroundColor,
                        color: template.textColor,
                        borderStyle: template.borderStyle,
                      }}
                    >
                      Certificate Preview
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created: {template.createdDate}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issued" className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search by learner name or certificate number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Issued Certificates</CardTitle>
                <CardDescription>View and manage all issued certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate #</TableHead>
                      <TableHead>Learner</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Issued Date</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">{cert.certificateNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{cert.learnerName}</div>
                            <div className="text-sm text-muted-foreground">{cert.learnerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{cert.templateName}</TableCell>
                        <TableCell>{cert.issuedDate}</TableCell>
                        <TableCell>{cert.completionDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadCertificate(cert)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

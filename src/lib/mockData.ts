// Mock data utilities for the admin dashboard

export interface Learner {
  id: string;
  name: string;
  email: string;
  avatar: string;
  completionPercentage: number;
  enrolledDate: string;
  lastActive: string;
  certificateIssued: boolean;
  status: 'active' | 'inactive';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'text' | 'video' | 'quiz';
  duration: string;
  completionRate: number;
  unlockCriteria?: string;
}

export interface Certificate {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerEmail: string;
  templateId: string;
  templateName: string;
  issuedDate: string;
  completionDate: string;
  certificateNumber: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  borderStyle: 'solid' | 'dashed' | 'double' | 'none';
  includeCompletionDate: boolean;
  includeSignature: boolean;
  generationRule: 'automatic' | 'manual';
  completionThreshold: number;
  isActive: boolean;
  createdDate: string;
}

export interface Stats {
  totalLearners: number;
  activeModules: number;
  completionRate: number;
  certificatesIssued: number;
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  fileType: string;
  size: number;
  url: string;
  thumbnail?: string;
  uploadedBy: string;
  uploadedDate: string;
  tags: string[];
  usedInModules: string[];
}

// Mock learners data
export const mockLearners: Learner[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'SJ',
    completionPercentage: 85,
    enrolledDate: '2024-01-15',
    lastActive: '2 hours ago',
    certificateIssued: false,
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    avatar: 'MC',
    completionPercentage: 100,
    enrolledDate: '2024-01-10',
    lastActive: '1 day ago',
    certificateIssued: true,
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    avatar: 'ER',
    completionPercentage: 45,
    enrolledDate: '2024-02-01',
    lastActive: '5 hours ago',
    certificateIssued: false,
    status: 'active',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.k@example.com',
    avatar: 'DK',
    completionPercentage: 92,
    enrolledDate: '2024-01-20',
    lastActive: '3 hours ago',
    certificateIssued: false,
    status: 'active',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    avatar: 'LT',
    completionPercentage: 20,
    enrolledDate: '2024-02-15',
    lastActive: '2 weeks ago',
    certificateIssued: false,
    status: 'inactive',
  },
];

// Mock modules data
export const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Learning',
    description: 'Get started with the fundamentals',
    order: 1,
    type: 'text',
    duration: '30 min',
    completionRate: 95,
  },
  {
    id: '2',
    title: 'Core Concepts',
    description: 'Understand the key principles',
    order: 2,
    type: 'video',
    duration: '45 min',
    completionRate: 78,
    unlockCriteria: 'Complete Module 1',
  },
  {
    id: '3',
    title: 'Practical Applications',
    description: 'Apply what you have learned',
    order: 3,
    type: 'quiz',
    duration: '60 min',
    completionRate: 62,
    unlockCriteria: 'Complete Module 2',
  },
  {
    id: '4',
    title: 'Advanced Topics',
    description: 'Deep dive into complex subjects',
    order: 4,
    type: 'video',
    duration: '90 min',
    completionRate: 45,
    unlockCriteria: 'Complete Module 3',
  },
];

// Mock stats
export const mockStats: Stats = {
  totalLearners: 248,
  activeModules: 12,
  completionRate: 68,
  certificatesIssued: 156,
};

// Auth utilities
export const AUTH_KEY = 'admin_authenticated';

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (email: string, password: string): boolean => {
  // Simple mock authentication
  if (email === 'admin@example.com' && password === 'admin123') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Mock certificate templates
export const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: '1',
    name: 'Standard Completion',
    description: 'Default certificate for course completion',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderStyle: 'solid',
    includeCompletionDate: true,
    includeSignature: true,
    generationRule: 'automatic',
    completionThreshold: 100,
    isActive: true,
    createdDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'Excellence Award',
    description: 'Certificate for top performers',
    backgroundColor: '#FEF3C7',
    textColor: '#92400E',
    borderStyle: 'double',
    includeCompletionDate: true,
    includeSignature: true,
    generationRule: 'manual',
    completionThreshold: 95,
    isActive: true,
    createdDate: '2024-01-15',
  },
  {
    id: '3',
    name: 'Participation',
    description: 'Certificate for course participation',
    backgroundColor: '#DBEAFE',
    textColor: '#1E3A8A',
    borderStyle: 'solid',
    includeCompletionDate: false,
    includeSignature: false,
    generationRule: 'automatic',
    completionThreshold: 50,
    isActive: false,
    createdDate: '2024-02-01',
  },
];

// Mock issued certificates
export const mockIssuedCertificates: Certificate[] = [
  {
    id: '1',
    learnerId: '2',
    learnerName: 'Michael Chen',
    learnerEmail: 'michael.c@example.com',
    templateId: '1',
    templateName: 'Standard Completion',
    issuedDate: '2024-02-15',
    completionDate: '2024-02-15',
    certificateNumber: 'CERT-2024-001',
  },
  {
    id: '2',
    learnerId: '6',
    learnerName: 'Amanda White',
    learnerEmail: 'amanda.w@example.com',
    templateId: '1',
    templateName: 'Standard Completion',
    issuedDate: '2024-02-10',
    completionDate: '2024-02-10',
    certificateNumber: 'CERT-2024-002',
  },
  {
    id: '3',
    learnerId: '7',
    learnerName: 'Robert Brown',
    learnerEmail: 'robert.b@example.com',
    templateId: '2',
    templateName: 'Excellence Award',
    issuedDate: '2024-02-20',
    completionDate: '2024-02-18',
    certificateNumber: 'CERT-2024-003',
  },
];

// Mock media library files
export const mockMediaFiles: MediaFile[] = [
  {
    id: '1',
    name: 'introduction-banner.jpg',
    type: 'image',
    fileType: 'image/jpeg',
    size: 2458000,
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-01-15',
    tags: ['banner', 'introduction', 'hero'],
    usedInModules: ['Introduction to Learning'],
  },
  {
    id: '2',
    name: 'tutorial-video.mp4',
    type: 'video',
    fileType: 'video/mp4',
    size: 15680000,
    url: 'https://example.com/videos/tutorial.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-01-20',
    tags: ['tutorial', 'video', 'core-concepts'],
    usedInModules: ['Core Concepts'],
  },
  {
    id: '3',
    name: 'course-guide.pdf',
    type: 'document',
    fileType: 'application/pdf',
    size: 1024000,
    url: 'https://example.com/docs/course-guide.pdf',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-01-22',
    tags: ['guide', 'documentation', 'reference'],
    usedInModules: ['Introduction to Learning', 'Core Concepts'],
  },
  {
    id: '4',
    name: 'concept-diagram.png',
    type: 'image',
    fileType: 'image/png',
    size: 892000,
    url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31',
    thumbnail: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-02-01',
    tags: ['diagram', 'concept', 'visual'],
    usedInModules: ['Core Concepts', 'Practical Applications'],
  },
  {
    id: '5',
    name: 'demo-presentation.mp4',
    type: 'video',
    fileType: 'video/mp4',
    size: 23450000,
    url: 'https://example.com/videos/demo.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-02-05',
    tags: ['demo', 'presentation', 'advanced'],
    usedInModules: ['Advanced Topics'],
  },
  {
    id: '6',
    name: 'exercise-worksheet.pdf',
    type: 'document',
    fileType: 'application/pdf',
    size: 512000,
    url: 'https://example.com/docs/worksheet.pdf',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-02-08',
    tags: ['exercise', 'worksheet', 'practice'],
    usedInModules: ['Practical Applications'],
  },
  {
    id: '7',
    name: 'background-texture.jpg',
    type: 'image',
    fileType: 'image/jpeg',
    size: 1567000,
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-02-10',
    tags: ['background', 'texture', 'design'],
    usedInModules: [],
  },
  {
    id: '8',
    name: 'study-materials.docx',
    type: 'document',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 768000,
    url: 'https://example.com/docs/study-materials.docx',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-02-12',
    tags: ['study', 'materials', 'reference'],
    usedInModules: ['Core Concepts'],
  },
];

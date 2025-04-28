export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Knowledge = {
  id: string;
  title: string;
  type: 'document' | 'pdf' | 'video' | 'image' | 'text';
  createdAt: Date;
  updatedAt: Date;
  fileSize?: string;
  thumbnail?: string;
};

export type Collection = {
  id: string;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: Date;
  knowledgeCount: number;
  isPublic: boolean;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  collectionId: string;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
};

export type Quiz = {
  id: string;
  title: string;
  description?: string;
  collectionId: string;
  questionCount: number;
  createdAt: Date;
  lastCompleted?: Date;
};

export type StudyGuide = {
  id: string;
  title: string;
  content: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TabItem = {
  label: string;
  value: string;
};

export type SidebarLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};
import { Collection, Flashcard, Knowledge, Note, Quiz, StudyGuide } from '../types';

// Mock collections (study spaces)
export const collections: Collection[] = [
  {
    id: '1',
    title: 'Computer Science',
    description: 'Algorithms, data structures, and programming concepts',
    icon: 'laptop-code',
    color: '#4364F7',
    createdAt: new Date('2024-01-10'),
    knowledgeCount: 12,
    isPublic: true,
  },
  {
    id: '2',
    title: 'Mathematics',
    description: 'Calculus, algebra, and statistics',
    icon: 'sigma',
    color: '#16A34A',
    createdAt: new Date('2024-02-15'),
    knowledgeCount: 8,
    isPublic: true,
  },
  {
    id: '3',
    title: 'Psychology',
    description: 'Human behavior and mental processes',
    icon: 'brain',
    color: '#9333EA',
    createdAt: new Date('2024-03-05'),
    knowledgeCount: 10,
    isPublic: false,
  },
  {
    id: '4',
    title: 'Economics',
    description: 'Micro and macroeconomics principles',
    icon: 'trending-up',
    color: '#F59E0B',
    createdAt: new Date('2024-03-20'),
    knowledgeCount: 6,
    isPublic: true,
  },
];

// Mock knowledge items
export const knowledgeItems: Knowledge[] = [
  {
    id: 'k1',
    title: 'Data Structures and Algorithms.pdf',
    type: 'pdf',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01'),
    fileSize: '2.4 MB',
    thumbnail: '/thumbnails/pdf.png',
  },
  {
    id: 'k2',
    title: 'Introduction to Machine Learning.pdf',
    type: 'pdf',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
    fileSize: '3.8 MB',
    thumbnail: '/thumbnails/pdf.png',
  },
  {
    id: 'k3',
    title: 'CS50 Lecture Notes.txt',
    type: 'text',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-04-15'),
    fileSize: '156 KB',
  },
  {
    id: 'k4',
    title: 'Python Programming Basics.mp4',
    type: 'video',
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-04-12'),
    fileSize: '128 MB',
    thumbnail: '/thumbnails/video.png',
  },
  {
    id: 'k5',
    title: 'Web Development Roadmap.png',
    type: 'image',
    createdAt: new Date('2024-04-18'),
    updatedAt: new Date('2024-04-18'),
    fileSize: '1.2 MB',
    thumbnail: '/thumbnails/image.png',
  },
];

// Mock flashcards
export const flashcards: Flashcard[] = [
  {
    id: 'f1',
    question: 'What is Big O notation?',
    answer: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.',
    collectionId: '1',
    lastReviewed: new Date('2024-04-18'),
    difficulty: 'medium',
  },
  {
    id: 'f2',
    question: 'What is a binary search?',
    answer: 'Binary search is a search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    collectionId: '1',
    lastReviewed: new Date('2024-04-17'),
    difficulty: 'easy',
  },
  {
    id: 'f3',
    question: 'What is the derivative of sin(x)?',
    answer: 'The derivative of sin(x) is cos(x).',
    collectionId: '2',
    lastReviewed: new Date('2024-04-15'),
    difficulty: 'easy',
  },
];

// Mock quizzes
export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Data Structures Quiz',
    description: 'Test your knowledge of basic data structures',
    collectionId: '1',
    questionCount: 10,
    createdAt: new Date('2024-04-10'),
    lastCompleted: new Date('2024-04-18'),
  },
  {
    id: 'q2',
    title: 'Algorithm Complexity',
    description: 'Test your understanding of algorithm time and space complexity',
    collectionId: '1',
    questionCount: 8,
    createdAt: new Date('2024-04-12'),
  },
  {
    id: 'q3',
    title: 'Calculus Fundamentals',
    description: 'Test your knowledge of basic calculus concepts',
    collectionId: '2',
    questionCount: 12,
    createdAt: new Date('2024-04-15'),
  },
];

// Mock study guides
export const studyGuides: StudyGuide[] = [
  {
    id: 'sg1',
    title: 'Data Structures Cheat Sheet',
    content: 'A comprehensive guide to common data structures and their operations...',
    collectionId: '1',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    id: 'sg2',
    title: 'Big O Complexity Chart',
    content: 'Visual representation of common algorithm time complexities...',
    collectionId: '1',
    createdAt: new Date('2024-04-08'),
    updatedAt: new Date('2024-04-08'),
  },
];

// Mock notes
export const notes: Note[] = [
  {
    id: 'n1',
    title: 'Binary Tree Traversal Methods',
    content: 'There are three common ways to traverse a binary tree: in-order, pre-order, and post-order...',
    collectionId: '1',
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    id: 'n2',
    title: 'Sorting Algorithm Comparison',
    content: 'Quick Sort vs. Merge Sort: Quick sort is usually faster in practice, but Merge sort has guaranteed O(n log n) performance...',
    collectionId: '1',
    createdAt: new Date('2024-04-13'),
    updatedAt: new Date('2024-04-13'),
  },
];

// Featured collections
export const featuredCollections: Collection[] = [
  {
    id: '5',
    title: 'Learn Python',
    description: 'Comprehensive guide to Python programming',
    icon: 'code',
    color: '#3B82F6',
    createdAt: new Date('2024-03-10'),
    knowledgeCount: 24,
    isPublic: true,
  },
  {
    id: '6',
    title: 'Machine Learning Basics',
    description: 'Foundations of ML algorithms and concepts',
    icon: 'brain',
    color: '#EC4899',
    createdAt: new Date('2024-02-28'),
    knowledgeCount: 18,
    isPublic: true,
  },
  {
    id: '7',
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript and modern frameworks',
    icon: 'globe',
    color: '#F59E0B',
    createdAt: new Date('2024-03-15'),
    knowledgeCount: 32,
    isPublic: true,
  },
];
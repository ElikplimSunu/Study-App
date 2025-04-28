import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import HomePage from './pages/HomePage';
import KnowledgePage from './pages/KnowledgePage';
import CollectionsPage from './pages/CollectionsPage';
import NotesPage from './pages/NotesPage';
import StudyGuidesPage from './pages/StudyGuidesPage';
import QuizzesPage from './pages/QuizzesPage';
import FlashcardsPage from './pages/FlashcardsPage';
import KnowledgeViewPage from './pages/KnowledgeViewPage';
import CreateCollectionPage from './pages/CreateCollectionPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/knowledge/:id" element={<KnowledgeViewPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/create" element={<CreateCollectionPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/study-guides" element={<StudyGuidesPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
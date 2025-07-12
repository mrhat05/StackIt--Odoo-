import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage.jsx';
import AskPage from './pages/AskPage';
import QuestionDetailPage from './pages/QuestionDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function Layout({ children }) {
  // TODO: Add background, theme, and responsiveness
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 py-4">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/question/:id" element={<QuestionDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AskPage from './pages/AskPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AnswerDetailPage from './pages/AnswerDetailPage';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleLoginToast = (event) => {
      const { action } = event.detail;
      window.toastifyLogin(action);
    };
    window.addEventListener('showLoginToast', handleLoginToast);
    return () => window.removeEventListener('showLoginToast', handleLoginToast);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/question/:id" element={<QuestionDetailPage />} />
          <Route path="/answer/:id" element={<AnswerDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName={() =>
          'rounded-xl shadow-2xl border-l-8 border-purple-500 bg-white text-gray-900 text-base font-semibold px-6 py-5 min-w-[320px] max-w-[90vw] flex items-center'
        }
        bodyClassName={() => 'flex items-center text-lg'}
        icon={false}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import BackToTop from './components/layout/BackToTop';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Loader />
        <div className="min-h-screen bg-background text-ink transition-colors duration-300 dark:bg-[#09090b] dark:text-slate-100">
          <Navbar />
          <main className="overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

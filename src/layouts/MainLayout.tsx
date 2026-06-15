import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header / Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

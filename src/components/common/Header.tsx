import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            Antigravity.Dev
          </span>
        </NavLink>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-all duration-200 py-1 ${
                  isActive 
                    ? 'text-indigo-400 nav-link-active' 
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

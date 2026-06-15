import { SOCIAL_LINKS } from '../../constants';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/40 py-8 text-center text-slate-500 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} Antigravity. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.platform}
              href={link.url} 
              className="hover:text-slate-300 transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface CodeTab {
  id: string;
  filename: string;
  icon: string;
  iconColor: string;
  language: string;
  code: string[];
}

const TABS: CodeTab[] = [
  {
    id: 'laravel',
    filename: 'routes/api.php',
    icon: 'logos:laravel',
    iconColor: 'text-red-500',
    language: 'php',
    code: [
      '<?php',
      '',
      'use App\\Http\\Controllers\\LmsController;',
      'use App\\Services\\HlsStreamService;',
      '',
      "Route::middleware(['auth:sanctum', 'rbac:admin'])->group(function () {",
      "    Route::get('/v1/system/health', [LmsController::class, 'metrics']);",
      "    Route::post('/v1/video/hls-stream', [HlsStreamService::class, 'encode']);",
      "    Route::get('/v1/cache/purge', fn () => Redis::flushall());",
      '});',
    ],
  },
  {
    id: 'react',
    filename: 'UserProfile.tsx',
    icon: 'logos:react',
    iconColor: 'text-sky-400',
    language: 'typescript',
    code: [
      "import { useState } from 'react';",
      "import { motion } from 'framer-motion';",
      '',
      'export default function SystemStatus() {',
      "  const [status] = useState('Production Ready');",
      '',
      '  return (',
      '    <div className="rounded-2xl p-6 bg-slate-900 border border-blue-500/20">',
      '      <h3 className="text-lg font-bold text-blue-400">System Uptime 99.9%</h3>',
      '      <span className="text-xs font-mono text-emerald-400">{status}</span>',
      '    </div>',
      '  );',
      '}',
    ],
  },
  {
    id: 'docker',
    filename: 'docker-compose.yml',
    icon: 'logos:docker',
    iconColor: 'text-blue-400',
    language: 'yaml',
    code: [
      "version: '3.8'",
      'services:',
      '  laravel_api:',
      '    build: .',
      '    ports:',
      '      - "8000:8000"',
      '    environment:',
      '      - APP_ENV=production',
      '      - REDIS_HOST=cache',
      '  cache:',
      '    image: redis:7-alpine',
    ],
  },
];

export default function CodeIdeWindow() {
  const [activeTabId, setActiveTabId] = useState('laravel');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];
  const fullCode = activeTab.code;

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setLineIndex(0);
    setCharIndex(0);
  };

  useEffect(() => {
    if (lineIndex >= fullCode.length) return;

    const currentLine = fullCode[lineIndex];
    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [charIndex, lineIndex, fullCode]);

  // Cursor blink effect
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      
      {/* Background Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-sky-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main IDE Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 dark:border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50">
        
        {/* macOS Title Bar & Tabs */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-[#161b22] border-b border-slate-800/80">
          
          {/* macOS 3 Window Dots */}
          <div className="flex items-center gap-2 shrink-0 pr-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          </div>

          {/* File Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                  tab.id === activeTabId
                    ? 'bg-[#0d1117] text-white border border-slate-700/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon icon={tab.icon} className="text-sm" />
                <span>{tab.filename}</span>
              </button>
            ))}
          </div>

          {/* Code Icon */}
          <div className="hidden sm:flex items-center text-slate-500 pl-4">
            <Icon icon="mdi:code-brackets" className="text-base" />
          </div>
        </div>

        {/* Code Content Container */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 overflow-x-auto min-h-[260px] sm:min-h-[290px] flex">
          
          {/* Line Numbers */}
          <div className="flex flex-col select-none pr-4 text-slate-600 text-right font-mono border-r border-slate-800/80 shrink-0 mr-4">
            {fullCode.map((_, idx) => (
              <span key={idx} className={idx <= lineIndex ? 'text-slate-500' : 'text-slate-700'}>
                {idx + 1}
              </span>
            ))}
          </div>

          {/* Animated Typed Lines */}
          <div className="flex-1 overflow-x-auto">
            {fullCode.map((lineText, idx) => {
              if (idx > lineIndex) return null;

              const isCurrentLine = idx === lineIndex;
              const textToRender = isCurrentLine ? lineText.slice(0, charIndex) : lineText;

              return (
                <div key={idx} className="whitespace-pre flex items-center min-h-[1.5rem]">
                  <span className="text-slate-200">
                    {formatSyntax(textToRender)}
                  </span>
                  {isCurrentLine && (
                    <span
                      className={`inline-block w-2 h-4 bg-blue-400 ml-0.5 -mb-0.5 ${
                        showCursor ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* IDE Footer Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Clean Code</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">UTF-8</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {activeTab.filename.split('.').pop()?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Syntax Highlighter helper for Code Viewer
function formatSyntax(line: string) {
  if (!line) return line;

  // Comments
  if (line.trim().startsWith('//') || line.trim().startsWith('<?php') || line.trim().startsWith('version:')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Quick token coloring for PHP / TS / YAML keywords
  return line.split(/(\s+|[()[\]{},.:;=>'"])/).map((token, i) => {
    if (['use', 'Route', 'middleware', 'group', 'function', 'class', 'import', 'export', 'default', 'return', 'const', 'version', 'services'].includes(token)) {
      return <span key={i} className="text-purple-400 font-bold">{token}</span>;
    }
    if (['auth:sanctum', 'rbac:admin', 'Production Ready', 'System Uptime 99.9%', 'redis:7-alpine'].includes(token)) {
      return <span key={i} className="text-amber-300">{token}</span>;
    }
    if (['get', 'post', 'encode', 'metrics', 'flushall', 'useState', 'render', 'build', 'ports', 'environment'].includes(token)) {
      return <span key={i} className="text-sky-400">{token}</span>;
    }
    if (token.startsWith("'") || token.startsWith('"')) {
      return <span key={i} className="text-emerald-300">{token}</span>;
    }
    return token;
  });
}

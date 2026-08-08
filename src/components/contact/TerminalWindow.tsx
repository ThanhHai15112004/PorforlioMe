import { useState, useEffect } from 'react';

const LINES = [
  { text: '> initializing connection...', delay: 0 },
  { text: '> status: available for new projects', delay: 700 },
  { text: '> location: Vietnam', delay: 1400 },
  { text: '> tech_stack: Laravel · React · Docker', delay: 2100 },
  { text: '> response_time: within 24–48 hours', delay: 2800 },
  { text: '> ready_for: collaboration, hire, consult', delay: 3500 },
  { text: '> waiting for your message_', delay: 4200 },
];

function usePrintedLines(lines: typeof LINES) {
  const [printed, setPrinted] = useState<string[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((line) => {
      const t = setTimeout(() => {
        setPrinted((prev) => [...prev, line.text]);
      }, line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return printed;
}

export default function TerminalWindow() {
  const printed = usePrintedLines(LINES);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 shadow-2xl shadow-slate-200/60 dark:shadow-black/40">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="flex-1 text-center text-xs text-slate-500 font-mono">
          connection.sh
        </span>
      </div>

      {/* Terminal body */}
      <div className="bg-slate-900 px-6 py-5 min-h-[200px] font-mono text-sm leading-7">
        {printed.map((line, i) => {
          const isLast = i === printed.length - 1;
          const isCommand = line.startsWith('>');
          return (
            <div key={i} className="flex items-start gap-0">
              <span
                className={
                  isCommand
                    ? 'text-emerald-400'
                    : 'text-slate-400'
                }
              >
                {/* Strip trailing underscore from last line — we'll add blinking cursor */}
                {isLast && line.endsWith('_')
                  ? line.slice(0, -1)
                  : line}
              </span>
              {/* Blinking cursor only on last line */}
              {isLast && (
                <span
                  className={`
                    ml-0.5 inline-block w-2 h-4 bg-emerald-400 mt-1
                    transition-opacity duration-100
                    ${showCursor ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

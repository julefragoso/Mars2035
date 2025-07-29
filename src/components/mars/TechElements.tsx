import { useEffect, useState } from 'react';

interface HologramLineProps {
  text: string;
  delay?: number;
  className?: string;
}

export const HologramLine = ({ text, delay = 0, className = '' }: HologramLineProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setShowCursor(false);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <div className={`font-mono text-mars-glow ${className}`}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </div>
  );
};

export const TechPanel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative bg-card/20 backdrop-blur-sm border border-mars-rust/30 rounded-lg overflow-hidden ${className}`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mars-glow/10 to-transparent animate-shimmer" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-mars-rust" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-mars-rust" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-mars-rust" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-mars-rust" />
      
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};

export const DataStream = () => {
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    const generateStream = () => {
      const chars = '01';
      return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const interval = setInterval(() => {
      setStreams(prev => {
        const newStreams = [...prev, generateStream()];
        return newStreams.slice(-8); // Keep only last 8 streams
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30 pointer-events-none">
      <div className="flex flex-col gap-1 font-mono text-xs text-mars-glow">
        {streams.map((stream, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 1 - (index * 0.1),
            }}
          >
            {stream}
          </div>
        ))}
      </div>
    </div>
  );
};

export const LoadingBar = ({ progress, label }: { progress: number; label: string }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-muted-foreground">{label}</span>
        <span className="text-xs font-mono text-mars-glow">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-muted/30 h-1 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-mars-rust to-mars-glow transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
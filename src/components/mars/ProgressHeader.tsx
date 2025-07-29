import { ArrowLeft, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedStars, GlowOrb } from './AnimatedBackground';
import { HologramLine, TechPanel } from './TechElements';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  title: string;
  subtitle: string;
}

export const ProgressHeader = ({ currentStep, totalSteps, onBack, title, subtitle }: ProgressHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="relative border-b border-border bg-card/20 backdrop-blur-sm overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <AnimatedStars />
      </div>
      
      {/* Tech grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--mars-rust) / 0.3) 1px, transparent 1px),
            linear-gradient(180deg, hsl(var(--mars-rust) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 animate-fade-in-up">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-mars-glow transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center space-x-3">
              <GlowOrb className="w-6 h-6 animate-float" />
              <div>
                <HologramLine text={title} className="text-2xl font-display font-semibold text-foreground" />
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right animate-stagger-fade">
            <div className="flex items-center space-x-2 text-sm font-mono text-muted-foreground">
              <Activity className="h-4 w-4 text-mars-glow animate-glow-pulse" />
              <span>Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="text-xs text-mars-rust mt-1 flex items-center">
              <Zap className="h-3 w-3 mr-1 animate-float" />
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
        
        {/* Enhanced progress bar */}
        <div className="relative">
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-mars-rust via-mars-glow to-mars-rust h-2 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Progress segments */}
          <div className="absolute top-0 w-full h-2 flex">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i}
                className={`flex-1 border-r border-background/50 last:border-r-0 ${
                  i < currentStep ? 'bg-mars-glow/20' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex justify-between items-center mt-3 text-xs font-mono">
          <div className="flex space-x-4">
            <div className="flex items-center text-muted-foreground">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-glow-pulse" />
              Neural Link Active
            </div>
            <div className="flex items-center text-muted-foreground">
              <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 animate-glow-pulse" />
              Data Encrypted
            </div>
          </div>
          <div className="text-mars-rust animate-shimmer">
            M.A.R.S. PROTOCOL ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};
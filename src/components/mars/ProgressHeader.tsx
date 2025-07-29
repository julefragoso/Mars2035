import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-mono text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="text-xs text-mars-rust">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-mars-rust to-mars-glow h-1 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
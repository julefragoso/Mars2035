import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-mars-soil/10">
      <div className="text-center space-y-8 px-8 max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-8">
            <Rocket className="h-16 w-16 text-mars-rust mr-4" />
            <div className="text-left">
              <h1 className="text-5xl font-display font-bold tracking-tight text-foreground">
                M.A.R.S.
              </h1>
              <p className="text-mars-rust font-mono text-sm uppercase tracking-wider">
                Mars Admission & Ranking System
              </p>
            </div>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p className="text-xl font-light">
              The official selection program for the Mars colonization mission.
            </p>
            <p className="text-sm font-mono leading-relaxed">
              This comprehensive evaluation will assess your physical, mental, and technical 
              capabilities for humanity's greatest expedition. Your responses will determine 
              your eligibility and role in establishing the first permanent human settlement on Mars.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono text-muted-foreground mb-8">
            <div className="text-center p-3 border border-muted rounded">
              <div className="text-mars-rust">01</div>
              <div>Identity</div>
            </div>
            <div className="text-center p-3 border border-muted rounded">
              <div className="text-mars-rust">02</div>
              <div>Physical</div>
            </div>
            <div className="text-center p-3 border border-muted rounded">
              <div className="text-mars-rust">03</div>
              <div>Lifestyle</div>
            </div>
            <div className="text-center p-3 border border-muted rounded">
              <div className="text-mars-rust">04</div>
              <div>Skills</div>
            </div>
            <div className="text-center p-3 border border-muted rounded">
              <div className="text-mars-rust">05</div>
              <div>Psychology</div>
            </div>
          </div>

          <Button 
            onClick={onStart} 
            variant="mars" 
            size="lg"
            className="px-12 py-6 text-lg"
          >
            Begin Evaluation
          </Button>
          
          <p className="text-xs font-mono text-muted-foreground mt-4">
            Estimated completion time: 8-12 minutes
          </p>
        </div>
      </div>
    </div>
  );
};
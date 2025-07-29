import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserData, PSYCHOLOGICAL_QUESTIONS } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';
import { AnimatedStars, FloatingTechElements, GlowOrb } from './AnimatedBackground';
import { TechPanel, HologramLine } from './TechElements';

interface Step5Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5Psychology = ({ userData, onUpdate, onNext, onBack }: Step5Props) => {
  const [responses, setResponses] = useState<Record<string, string>>(userData.psychologicalResponses || {});

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ psychologicalResponses: responses });
    onNext();
  };

  const answeredQuestions = Object.keys(responses).length;
  const isValid = answeredQuestions === PSYCHOLOGICAL_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedStars />
      <FloatingTechElements />
      
      <ProgressHeader
        currentStep={5}
        totalSteps={5}
        onBack={onBack}
        title="Psychological Evaluation"
        subtitle="Mental resilience and decision-making assessment"
      />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <TechPanel className="p-6 animate-fade-in-up">
            <div className="flex items-center mb-3">
              <GlowOrb className="w-6 h-6 mr-3" />
              <h3 className="text-lg font-medium text-foreground">Mission Scenarios</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              The following scenarios assess your psychological readiness for the unique challenges 
              of Mars colonization. Answer honestly - there are no universally "correct" responses.
            </p>
          </TechPanel>

          {PSYCHOLOGICAL_QUESTIONS.map((question, index) => (
            <TechPanel key={question.id} className="p-6 animate-stagger-fade" style={{ animationDelay: `${0.5 + (index * 0.2)}s` }}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-foreground">
                    Question {index + 1}
                  </h4>
                  <span className="text-xs font-mono text-mars-rust">
                    {question.id.toUpperCase()}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">
                  {question.question}
                </p>
              </div>

              <RadioGroup
                value={responses[question.id] || ''}
                onValueChange={(value) => handleResponseChange(question.id, value)}
                className="space-y-3"
              >
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-start space-x-3 p-3 rounded border border-muted hover:bg-muted/20 transition-colors">
                    <RadioGroupItem 
                      value={option} 
                      id={`${question.id}-${optionIndex}`}
                      className="border-mars-rust text-mars-rust mt-1"
                    />
                    <Label 
                      htmlFor={`${question.id}-${optionIndex}`} 
                      className="text-sm text-foreground cursor-pointer leading-relaxed flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </TechPanel>
          ))}

          <div className="text-center text-sm text-muted-foreground">
            Progress: <span className="text-mars-rust font-mono">{answeredQuestions}/{PSYCHOLOGICAL_QUESTIONS.length}</span> questions completed
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              type="submit" 
              variant="mars" 
              size="lg" 
              disabled={!isValid}
              className="w-full"
            >
              Complete Evaluation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
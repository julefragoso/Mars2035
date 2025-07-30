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
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <TechPanel className="animate-fade-in-up mars-mobile-panel-form">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2 animate-stagger-fade">
                Psychological Assessment
              </h2>
              <p className="text-muted-foreground animate-stagger-fade" style={{ animationDelay: '0.1s' }}>
                Mental resilience and psychological compatibility evaluation
              </p>
            </div>

            <div className="space-y-8">
              {PSYCHOLOGICAL_QUESTIONS.map((question, index) => (
                <div key={question.id} className="animate-stagger-fade" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <Label className="text-foreground font-medium flex items-start mars-mobile-form-label">
                    <div className="w-2 h-2 bg-mars-glow rounded-full mr-2 mt-2 animate-glow-pulse flex-shrink-0" />
                    <span className="text-base">{question.question}</span>
                  </Label>
                  <div className="mt-4 space-y-3 mars-mobile-psychology">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={option}
                          id={`${question.id}-${optionIndex}`}
                          className="border-mars-rust/30 focus:border-mars-glow mt-1"
                        />
                        <Label 
                          htmlFor={`${question.id}-${optionIndex}`} 
                          className="text-sm font-normal cursor-pointer mars-mobile-form-label leading-relaxed"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              size="lg" 
              disabled={!isValid}
              className="w-full relative overflow-hidden group mars-mobile-form-btn"
            >
              <span className="relative z-10">Complete Assessment</span>
            </Button>
          </form>
        </TechPanel>
      </div>
    </div>
  );
};
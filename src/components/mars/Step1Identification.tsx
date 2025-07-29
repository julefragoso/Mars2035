import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserData } from '@/types/mars';
import { ProgressHeader } from './ProgressHeader';

interface Step1Props {
  userData: UserData;
  onUpdate: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step1Identification = ({ userData, onUpdate, onNext, onBack }: Step1Props) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    country: userData.country,
    nativeLanguage: userData.nativeLanguage,
    profession: userData.profession
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  const isValid = formData.fullName && formData.country && formData.nativeLanguage && formData.profession;

  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader
        currentStep={1}
        totalSteps={5}
        onBack={onBack}
        title="Personal Identification"
        subtitle="Basic information required for mission records"
      />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-foreground font-medium">Full Legal Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="mt-2 bg-card border-border"
                placeholder="Enter your complete legal name"
                required
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-foreground font-medium">Country of Origin</Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="mt-2 bg-card border-border"
                placeholder="Country of citizenship"
                required
              />
            </div>

            <div>
              <Label htmlFor="nativeLanguage" className="text-foreground font-medium">Native Language</Label>
              <Input
                id="nativeLanguage"
                type="text"
                value={formData.nativeLanguage}
                onChange={(e) => setFormData(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                className="mt-2 bg-card border-border"
                placeholder="Primary spoken language"
                required
              />
            </div>

            <div>
              <Label htmlFor="profession" className="text-foreground font-medium">Current Profession</Label>
              <Input
                id="profession"
                type="text"
                value={formData.profession}
                onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                className="mt-2 bg-card border-border"
                placeholder="Your current job or field of expertise"
                required
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button 
              type="submit" 
              variant="mars" 
              size="lg" 
              disabled={!isValid}
              className="w-full"
            >
              Continue to Physical Assessment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
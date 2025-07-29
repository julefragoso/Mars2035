import { useMarsEvaluation } from '@/hooks/useMarsEvaluation';
import { StartScreen } from '@/components/mars/StartScreen';
import { Step1Identification } from '@/components/mars/Step1Identification';
import { Step2Physical } from '@/components/mars/Step2Physical';
import { Step3Lifestyle } from '@/components/mars/Step3Lifestyle';
import { Step4Skills } from '@/components/mars/Step4Skills';
import { Step5Psychology } from '@/components/mars/Step5Psychology';
import { ResultsScreen } from '@/components/mars/ResultsScreen';
import { FinalScreen } from '@/components/mars/FinalScreen';

const Index = () => {
  const { 
    currentStep, 
    userData, 
    updateUserData, 
    nextStep, 
    prevStep, 
    calculateScore,
    setCurrentStep 
  } = useMarsEvaluation();

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const handleShowResults = () => {
    setCurrentStep(6);
  };

  const handleShowCertificate = () => {
    setCurrentStep(7);
  };

  const result = currentStep >= 6 ? calculateScore() : null;

  // Start screen
  if (currentStep === 0) {
    return <StartScreen onStart={handleStart} />;
  }

  // Evaluation steps
  if (currentStep === 1) {
    return (
      <Step1Identification
        userData={userData}
        onUpdate={updateUserData}
        onNext={nextStep}
        onBack={() => setCurrentStep(0)}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <Step2Physical
        userData={userData}
        onUpdate={updateUserData}
        onNext={nextStep}
        onBack={prevStep}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <Step3Lifestyle
        userData={userData}
        onUpdate={updateUserData}
        onNext={nextStep}
        onBack={prevStep}
      />
    );
  }

  if (currentStep === 4) {
    return (
      <Step4Skills
        userData={userData}
        onUpdate={updateUserData}
        onNext={nextStep}
        onBack={prevStep}
      />
    );
  }

  if (currentStep === 5) {
    return (
      <Step5Psychology
        userData={userData}
        onUpdate={updateUserData}
        onNext={handleShowResults}
        onBack={prevStep}
      />
    );
  }

  // Results screen
  if (currentStep === 6 && result) {
    return (
      <ResultsScreen
        result={result}
        userData={userData}
        onContinue={handleShowCertificate}
      />
    );
  }

  // Final certificate screen
  if (currentStep === 7 && result) {
    return (
      <FinalScreen
        result={result}
        userData={userData}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;

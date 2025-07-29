import { useState } from 'react';
import { UserData, EvaluationResult } from '@/types/mars';

export const useMarsEvaluation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    country: '',
    nativeLanguage: '',
    profession: '',
    age: null,
    sex: '',
    height: null,
    weight: null,
    bloodType: '',
    generalHealth: '',
    exerciseHabits: '',
    dietType: '',
    sleepHours: null,
    addictions: '',
    skills: [],
    psychologicalResponses: {}
  });

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const calculateScore = (): EvaluationResult => {
    let physicalScore = 0;
    let mentalScore = 0;
    let skillsScore = 0;
    let compatibilityScore = 0;

    // Physical scoring
    if (userData.age && userData.age >= 25 && userData.age <= 45) physicalScore += 25;
    else if (userData.age && userData.age >= 18 && userData.age <= 55) physicalScore += 15;
    else physicalScore += 5;

    if (userData.generalHealth === 'Excellent') physicalScore += 25;
    else if (userData.generalHealth === 'Good') physicalScore += 15;
    else if (userData.generalHealth === 'Fair') physicalScore += 5;

    if (userData.exerciseHabits === 'Daily intense training') physicalScore += 25;
    else if (userData.exerciseHabits === 'Regular exercise (3-5x/week)') physicalScore += 20;
    else if (userData.exerciseHabits === 'Moderate activity') physicalScore += 10;

    if (userData.addictions === 'None') physicalScore += 25;

    // Mental/Psychological scoring
    const psych = userData.psychologicalResponses;
    if (psych.isolation?.includes('thrive')) mentalScore += 25;
    else if (psych.isolation?.includes('adapt')) mentalScore += 15;
    
    if (psych.leadership?.includes('Take immediate charge')) mentalScore += 20;
    else if (psych.leadership?.includes('Collaborate')) mentalScore += 25;
    
    if (psych.sacrifice?.includes('Volunteer immediately')) mentalScore += 25;
    else if (psych.sacrifice?.includes('weigh options')) mentalScore += 15;
    
    if (psych.failure?.includes('Stay calm')) mentalScore += 25;
    else if (psych.failure?.includes('Rally the team')) mentalScore += 20;
    
    if (psych.resources?.includes('Balanced approach')) mentalScore += 25;
    else if (psych.resources?.includes('Mission objectives')) mentalScore += 20;

    // Skills scoring
    skillsScore = Math.min(userData.skills.length * 7, 100);

    // Compatibility scoring (lifestyle factors)
    if (userData.sleepHours && userData.sleepHours >= 7 && userData.sleepHours <= 9) compatibilityScore += 25;
    if (userData.dietType === 'Balanced/Omnivore') compatibilityScore += 20;
    else if (userData.dietType === 'Vegetarian') compatibilityScore += 15;
    else if (userData.dietType === 'Vegan') compatibilityScore += 10;

    // Education/profession bonus
    const highValueProfessions = ['Engineer', 'Doctor', 'Scientist', 'Researcher', 'Pilot'];
    if (highValueProfessions.some(prof => userData.profession.toLowerCase().includes(prof.toLowerCase()))) {
      compatibilityScore += 25;
    }

    const breakdown = {
      physical: Math.min(physicalScore, 100),
      mental: Math.min(mentalScore, 100),
      skills: Math.min(skillsScore, 100),
      compatibility: Math.min(compatibilityScore, 100)
    };

    const overallScore = Math.round(
      (breakdown.physical + breakdown.mental + breakdown.skills + breakdown.compatibility) / 4
    );

    let suggestedRole = 'Support Specialist';
    if (overallScore >= 85) suggestedRole = 'Mission Commander';
    else if (overallScore >= 75) suggestedRole = 'Chief Engineer';
    else if (overallScore >= 65) suggestedRole = 'Senior Specialist';
    else if (overallScore >= 55) suggestedRole = 'Mission Specialist';
    else if (overallScore >= 45) suggestedRole = 'Operations Support';

    // Role adjustments based on skills
    if (userData.skills.includes('Medical/Healthcare') && overallScore >= 60) {
      suggestedRole = 'Chief Medical Officer';
    } else if (userData.skills.includes('Programming/Software Development') && overallScore >= 60) {
      suggestedRole = 'Systems Engineer';
    } else if (userData.skills.includes('Agriculture/Farming') && overallScore >= 55) {
      suggestedRole = 'Life Support Specialist';
    }

    return {
      overallScore,
      status: overallScore >= 60 ? 'Selected' : 'Not Selected',
      suggestedRole,
      breakdown
    };
  };

  return {
    currentStep,
    userData,
    updateUserData,
    nextStep,
    prevStep,
    calculateScore,
    setCurrentStep
  };
};
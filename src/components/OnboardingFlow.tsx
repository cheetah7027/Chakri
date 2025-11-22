import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface OnboardingFlowProps {
  onNavigate: (screen: string) => void;
  userType: 'seeker' | 'employer';
}

const skillsList = [
  'JavaScript', 'React', 'Python', 'Node.js', 'TypeScript', 'SQL',
  'AWS', 'Docker', 'Git', 'Figma', 'Product Management', 'Marketing',
  'Sales', 'Data Analysis', 'UI/UX Design', 'Project Management'
];

export default function OnboardingFlow({ onNavigate, userType }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);

  const totalSteps = userType === 'seeker' ? 5 : 3;

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const togglePreference = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onNavigate('swipe');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onNavigate('signup');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-[#111111]" />
          </Button>
          <span className="text-[#6E6E6E]">
            {step} of {totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2E6CE6]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 pb-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[#111111]">What's your name?</h2>
                <p className="text-[#6E6E6E]">Let's personalize your experience</p>
              </div>

              {/* Profile Photo Upload */}
              <div className="flex justify-center py-4">
                <div className="w-32 h-32 bg-[#E5E5E5] rounded-full flex items-center justify-center border-4 border-dashed border-[#2E6CE6]">
                  <Upload className="w-8 h-8 text-[#6E6E6E]" />
                </div>
              </div>
              <button className="w-full text-[#2E6CE6]">
                Upload Profile Photo
              </button>

              <div className="space-y-2">
                <label className="text-[#111111]">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 rounded-lg border-2 border-[#E5E5E5] focus:border-[#2E6CE6]"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[#111111]">Your Skills</h2>
                <p className="text-[#6E6E6E]">Select all that apply</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-[#2E6CE6] border-[#2E6CE6] text-white'
                        : 'bg-white border-[#E5E5E5] text-[#111111] hover:border-[#2E6CE6]'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && userType === 'seeker' && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[#111111]">Experience Level</h2>
                <p className="text-[#6E6E6E]">How many years of experience?</p>
              </div>

              <div className="space-y-3">
                {['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior (6-10 years)', 'Expert (10+ years)'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperience(level)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      experience === level
                        ? 'bg-[#2E6CE6]/10 border-[#2E6CE6]'
                        : 'bg-white border-[#E5E5E5] hover:border-[#2E6CE6]'
                    }`}
                  >
                    <span className="text-[#111111]">{level}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && userType === 'seeker' && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[#111111]">Upload Resume</h2>
                <p className="text-[#6E6E6E]">PDF format preferred</p>
              </div>

              <div className="w-full p-8 border-2 border-dashed border-[#2E6CE6] rounded-3xl bg-[#2E6CE6]/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-[#2E6CE6] rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-[#111111] mb-1">Click to upload</p>
                  <p className="text-[#6E6E6E]">or drag and drop</p>
                </div>
              </div>

              <div className="p-4 bg-[#4CAF50]/10 border border-[#4CAF50] rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111]">Resume.pdf</p>
                  <p className="text-[#6E6E6E]">2.4 MB</p>
                </div>
                <button className="text-[#6E6E6E]">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && userType === 'seeker' && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-[#111111]">Job Preferences</h2>
                <p className="text-[#6E6E6E]">What are you looking for?</p>
              </div>

              <div className="space-y-3">
                {['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Internship', 'Contract'].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      preferences.includes(pref)
                        ? 'bg-[#2E6CE6]/10 border-[#2E6CE6]'
                        : 'bg-white border-[#E5E5E5] hover:border-[#2E6CE6]'
                    }`}
                  >
                    <span className="text-[#111111]">{pref}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-8 pt-4">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-[#2E6CE6] hover:bg-[#1a4db8] text-white rounded-xl"
          disabled={step === 1 && !name}
        >
          {step === totalSteps ? 'Get Started' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

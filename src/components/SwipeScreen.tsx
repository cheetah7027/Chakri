import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { User, Heart, X, Star, MapPin, DollarSign, ChevronUp, MessageSquare, Bookmark, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import SkillBadge from './SkillBadge';

interface SwipeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const mockJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    logo: 'https://images.unsplash.com/photo-1760138270903-d95903188730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzYzNzg4MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    salary: '$120k - $160k',
    location: 'Remote',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1702046988296-40db18f155ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzc4MDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Join our dynamic team building next-gen web applications.'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'DesignLab',
    logo: 'https://images.unsplash.com/photo-1760138270903-d95903188730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzYzNzg4MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    salary: '$100k - $140k',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21wYW55JTIwb2ZmaWNlfGVufDF8fHx8MTc2MzgyODM5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Create beautiful and intuitive user experiences for millions of users.'
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    logo: 'https://images.unsplash.com/photo-1760138270903-d95903188730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzYzNzg4MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    salary: '$130k - $170k',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Python', 'React', 'AWS'],
    image: 'https://images.unsplash.com/photo-1702046988296-40db18f155ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2Mzc4MDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Build scalable systems that power the future of e-commerce.'
  }
];

function SwipeCard({ job, onSwipe, onExpand }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className="absolute left-[2px] right-[2px] h-full cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Job Image */}
        <div className="relative h-[55%]">
          <ImageWithFallback
            src={job.image}
            alt={job.company}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Company Logo */}
          <div className="absolute top-4 left-4 w-14 h-14 bg-white rounded-2xl shadow-lg overflow-hidden">
            <ImageWithFallback
              src={job.logo}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Expand Hint */}
          <button
            onClick={onExpand}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg"
          >
            <ChevronUp className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

        {/* Job Details */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-[#111111] mb-1">{job.title}</h2>
            <p className="text-[#6E6E6E]">{job.company}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#6E6E6E]">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full border border-[#4CAF50]/20">
                {job.location}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill: string) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeScreen({ onNavigate }: SwipeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  const currentJob = mockJobs[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Show match screen with 50% probability
      if (Math.random() > 0.5) {
        onNavigate('match', { matchedJob: currentJob });
        return;
      }
    }

    if (currentIndex < mockJobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleAction = (action: 'reject' | 'save' | 'like') => {
    if (action === 'like') {
      handleSwipe('right');
    } else if (action === 'reject') {
      handleSwipe('left');
    } else if (action === 'save') {
      // Save to favorites
      if (currentIndex < mockJobs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAFA]">
      {/* Top Bar */}
      <div className="p-6 flex items-center justify-between bg-white">
        <h3 className="text-[#111111]">JobMatch</h3>
        <button
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 bg-[#2E6CE6] rounded-full flex items-center justify-center"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Swipe Cards Area */}
      <div className="flex-1 p-6 relative flex items-center justify-center">
        {currentJob && (
          <SwipeCard
            key={currentJob.id}
            job={currentJob}
            onSwipe={handleSwipe}
            onExpand={() => onNavigate('details', { job: currentJob })}
          />
        )}
      </div>

      {/* Swipe Controls */}
      <div className="p-6 bg-white">
        <div className="flex items-center justify-center gap-6 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('reject')}
            className="w-16 h-16 bg-white border-2 border-[#FF5A5F] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF5A5F]/10 transition-colors"
          >
            <X className="w-8 h-8 text-[#FF5A5F]" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('save')}
            className="w-14 h-14 bg-white border-2 border-[#FFCA28] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFCA28]/10 transition-colors"
          >
            <Star className="w-6 h-6 text-[#FFCA28]" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('like')}
            className="w-16 h-16 bg-[#2E6CE6] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a4db8] transition-colors"
          >
            <Heart className="w-8 h-8 text-white" strokeWidth={2.5} fill="white" />
          </motion.button>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around pt-4 border-t border-[#E5E5E5]">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#2E6CE6]' : 'text-[#6E6E6E]'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => onNavigate('saved')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'saved' ? 'text-[#2E6CE6]' : 'text-[#6E6E6E]'}`}
          >
            <Bookmark className="w-6 h-6" />
            <span className="text-xs">Saved</span>
          </button>
          
          <button
            onClick={() => onNavigate('messages')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-[#2E6CE6]' : 'text-[#6E6E6E]'}`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </button>
          
          <button
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#2E6CE6]' : 'text-[#6E6E6E]'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { courses } from '@/data/courses';
import { ArrowLeft, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const [activeModule, setActiveModule] = useState(0);

  if (!course) {
      return <div className="p-8 text-center text-red-500">Course not found.</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
       {/* Sidebar/Module List */}
       <div className="w-80 border-r border-[#1E293B] bg-[#020617] overflow-y-auto">
          <div className="p-6 border-b border-[#1E293B]">
             <Link href="/learn" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Academy
             </Link>
             <h1 className="font-bold text-xl leading-tight text-white mb-2">{course.title}</h1>
             <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">{course.level} • {course.duration}</div>
          </div>
          <div className="p-4 space-y-2">
             {course.modules.map((mod, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveModule(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      activeModule === idx 
                      ? 'bg-blue-600/10 border-blue-500/50 text-white' 
                      : 'bg-[#1E293B]/20 border-transparent text-gray-400 hover:bg-[#1E293B]/50'
                  }`}
                >
                   <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${activeModule === idx ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-600 text-gray-500'}`}>
                      {idx + 1}
                   </div>
                   <span className="text-sm font-medium">{mod.title}</span>
                </button>
             ))}
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 bg-[#0F172A] overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl mx-auto p-12">
             <div className="bg-blue-600 h-64 rounded-2xl mb-8 flex items-center justify-center shadow-2xl shadow-blue-900/20">
                <PlayCircle className="w-20 h-20 text-white opacity-90 cursor-pointer hover:scale-110 transition-transform" />
             </div>
             
             <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-blue-500">#{activeModule + 1}</span> 
                {course.modules[activeModule].title}
             </h2>
             
             <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed">
                <p>{course.modules[activeModule].content}</p>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-8 p-6 bg-[#1E293B]/30 rounded-xl border border-[#1E293B]">
                   <h3 className="text-lg font-bold text-white mb-3">Key Takeaways</h3>
                   <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                         <CheckCircle className="w-5 h-5 text-green-500" />
                         <span>Understanding the core concepts is crucial for long-term success.</span>
                      </li>
                      <li className="flex items-center gap-2">
                         <CheckCircle className="w-5 h-5 text-green-500" />
                         <span>Always Apply risk management principles before executing trades.</span>
                      </li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

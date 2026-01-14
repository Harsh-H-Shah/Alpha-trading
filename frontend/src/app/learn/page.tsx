"use client";

import Link from 'next/link';
import { BookOpen, Clock, Target } from 'lucide-react';
import { courses } from '@/data/courses';

export default function LearnPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Alpha Academy</h1>
        <p className="text-gray-400">Master the markets with our comprehensive trading curriculum.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#1E293B]/20 border border-[#1E293B] rounded-2xl p-6 hover:bg-[#1E293B]/40 transition-all hover:border-blue-500/30 flex flex-col group">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <BookOpen className="w-6 h-6" />
               </div>
               <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${course.level === 'Beginner' ? 'text-green-400' : course.level === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {course.level}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                  </div>
               </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{course.title}</h2>
            <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-2">{course.description}</p>
            
            <Link 
              href={`/learn/${course.id}`}
              className="w-full py-3 bg-[#1E293B] hover:bg-blue-600 text-white font-semibold rounded-xl transition-all text-center border border-white/5 hover:border-blue-500/50 block"
            >
              Start Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

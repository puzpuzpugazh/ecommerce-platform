import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award } from 'lucide-react';

const team = [
  { name: 'Alice Johnson', role: 'CEO', avatar: '', bio: 'Visionary leader with 10+ years in e-commerce.' },
  { name: 'Bob Smith', role: 'CTO', avatar: '', bio: 'Tech enthusiast and full-stack developer.' },
  { name: 'Carol Lee', role: 'Head of Design', avatar: '', bio: 'Passionate about beautiful, user-friendly interfaces.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg p-8 mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">About Us</h1>
          <p className="text-gray-700 text-lg mb-6">
            We are a passionate team dedicated to building the best e-commerce experience for our customers. Our platform combines cutting-edge technology, beautiful design, and a customer-first approach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center">
              <Target className="h-10 w-10 text-pink-600 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-600">To make online shopping easy, enjoyable, and accessible for everyone.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="h-10 w-10 text-yellow-500 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Our Values</h2>
              <p className="text-gray-600">Innovation, integrity, and customer satisfaction are at the heart of everything we do.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <h2 className="text-xl font-semibold mb-2">Our Team</h2>
              <p className="text-gray-600">A diverse group of professionals with a shared passion for e-commerce.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center mb-3 text-2xl font-bold text-pink-600">
                  {member.avatar || member.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-pink-600 text-sm mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
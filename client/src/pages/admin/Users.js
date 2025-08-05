import React from 'react';
import { motion } from 'framer-motion';

const Users = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Users</h1>
          <p className="text-gray-600">User management coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Users; 
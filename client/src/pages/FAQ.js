import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our products, add items to your cart, and proceed to checkout. You can create an account or checkout as a guest.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, debit cards, bank transfers, and cash on delivery.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking link via email.'
  },
  {
    question: 'What is your return policy?',
    answer: 'You can return most items within 30 days of delivery for a full refund. Please see our Returns page for details.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can use the contact form on our Contact page or email us at support@ecommerce.com.'
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-lg p-8"
        >
          <div className="flex items-center mb-6">
            <HelpCircle className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <div key={faq.question}>
                <button
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  {openIndex === idx ? (
                    <ChevronUp className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-4"
                    >
                      <p className="text-gray-600 text-base px-2 pb-2">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
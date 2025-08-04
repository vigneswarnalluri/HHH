import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', className = '', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4 border-2',
      container: 'gap-1',
      text: 'text-xs'
    },
    md: {
      spinner: 'w-8 h-8 border-3',
      container: 'gap-2',
      text: 'text-sm'
    },
    lg: {
      spinner: 'w-12 h-12 border-4',
      container: 'gap-3',
      text: 'text-base'
    },
    xl: {
      spinner: 'w-16 h-16 border-4',
      container: 'gap-4',
      text: 'text-lg'
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: 360
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity
        }}
        className={`${sizeClasses[size].spinner} animate-spin rounded-full border-gray-300 border-t-primary-600`}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`${sizeClasses[size].text} text-gray-600 font-medium`}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
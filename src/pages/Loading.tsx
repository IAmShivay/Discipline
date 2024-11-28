import React from "react";
import { motion } from "framer-motion";

interface MinimalistLoaderProps {
  fullScreen?: boolean;
  message?: string;
}

const MinimalistHRLoader: React.FC<MinimalistLoaderProps> = ({
  fullScreen = true,
  message = "Loading",
}) => {
  const LoaderAnimation = () => (
    <div className="flex items-center justify-center space-x-2">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-3 h-3 bg-blue-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            delay: dot * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <LoaderAnimation />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-medium tracking-wide"
          >
            {message}
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100px]">
      <LoaderAnimation />
    </div>
  );
};

export default MinimalistHRLoader;

import React from 'react';
import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  title: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Construction className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">
          This section is under construction. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
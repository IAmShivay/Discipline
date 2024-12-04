import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageViewerProps {
  imageUrl: string;
  alt?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ 
  imageUrl, 
  alt = "Viewed Image" 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openImageViewer = () => {
    setIsOpen(true);
  };

  const closeImageViewer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={openImageViewer}
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        <ImageIcon className="mr-2" />
        View Image
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          <div className="relative max-w-full max-h-full">
            {/* Close Button */}
            <button 
              onClick={closeImageViewer}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close image viewer"
            >
              <X size={32} />
            </button>

            {/* Image Container */}
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
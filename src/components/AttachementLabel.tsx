import React from 'react';
import { Paperclip, AlertCircle } from 'lucide-react';

const AttachmentLabel = ({ maxAttachments }: { maxAttachments:string }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-md p-2">
      <div className="flex items-center space-x-2">
        <Paperclip className="text-gray-500 w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">
          Attachments
        </span>
      </div>
      <div className="flex items-center space-x-1 ml-auto">
        <AlertCircle className="text-yellow-500 w-4 h-4" />
        <span className="text-xs text-yellow-600 font-semibold">
          Max {maxAttachments} attachments
        </span>
      </div>
    </div>
  );
};

export default AttachmentLabel;
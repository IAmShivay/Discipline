import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Misconduct',
    description: 'Violations of company policies and professional conduct',
  },
  {
    id: '2',
    name: 'Attendance',
    description: 'Issues related to attendance and punctuality',
  },
];

const mockTags: Tag[] = [
  { id: '1', name: 'Urgent', color: 'red' },
  { id: '2', name: 'Follow-up', color: 'yellow' },
];

const CategoriesAndTags = () => {
  const [categories] = useState<Category[]>(mockCategories);
  const [tags] = useState<Tag[]>(mockTags);
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Categories & Tags
        </h2>
        <p className="text-sm text-gray-500">
          Manage case categories and classification tags
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'tags'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tags
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'categories' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Case Categories</h3>
            <button className="btn btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.description}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tags</h3>
            <button className="btn btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Tag
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full bg-${tag.color}-500`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {tag.name}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesAndTags;
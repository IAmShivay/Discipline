import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { CustomField, FieldType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface CustomFieldFormProps {
  onAddField: (field: CustomField) => void;
}

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ onAddField }) => {
  const [showForm, setShowForm] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState<FieldType>('text');
  const [isRequired, setIsRequired] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newField: CustomField = {
      id: uuidv4(),
      name: fieldName,
      type: fieldType,
      required: isRequired,
      ...(fieldType === 'select' && { options }),
    };
    onAddField(newField);
    setShowForm(false);
    setFieldName('');
    setFieldType('text');
    setIsRequired(false);
    setOptions([]);
  };

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="btn btn-secondary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Custom Field
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add Custom Field</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field Name
          </label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field Type
          </label>
          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value as FieldType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {fieldType === 'select' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add option"
                />
                <button
                  type="button"
                  onClick={addOption}
                  className="btn btn-secondary"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>{option}</span>
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="required" className="ml-2 text-sm text-gray-700">
            Required field
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Field
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomFieldForm;
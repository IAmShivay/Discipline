import React, { useState, useEffect } from "react";
import { Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  addCategory as addCategoryAction,
  fetchCategories,
} from "../../redux/app/categories/categorieSlice";
import { showSnackbar } from "../../redux/app/error/errorSlice";
import { useSelector } from "react-redux";
import { Suspense } from "react";
interface Category {
  _id?: string;
  name: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

const COLORS = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];

const CategoriesAndTags = () => {
  const { status, error, items } = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<Category[]>(items);

  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "Urgent", color: "red" },
    { id: "2", name: "Follow-up", color: "yellow" },
  ]);

  const [activeTab, setActiveTab] = useState<"categories" | "tags">(
    "categories"
  );
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);

  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newTag, setNewTag] = useState({ name: "", color: "red" });

  const [categoryError, setCategoryError] = useState("");
  const [tagError, setTagError] = useState("");

  const addCategory = async () => {
    // Validate category input
    if (!newCategory.name.trim()) {
      setCategoryError("Category name is required");
      return;
    }

    if (!newCategory.description.trim()) {
      setCategoryError("Category description is required");
      return;
    }

    const newCategoryItem = {
      id: (categories.length + 1).toString(),
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
    };

    const response = await dispatch(addCategoryAction(newCategoryItem));
    if (addCategoryAction.fulfilled.match(response)) {
      dispatch(
        showSnackbar({
          message: "Category added successfully",
          severity: "success",
        })
      );
      
      setCategories([...categories, newCategoryItem]);
    } else {
      const { errors }: any = error;
      dispatch(
        showSnackbar({
          message: errors?.map((e: any) => e.message) || "An error occurred",
          severity: "error",
        })
      );
    }

    setNewCategory({ name: "", description: "" });
    setIsAddingCategory(false);
    setCategoryError("");
  };

  const addTag = () => {
    // Validate tag input
    if (!newTag.name.trim()) {
      setTagError("Tag name is required");
      return;
    }

    const newTagItem = {
      id: (tags.length + 1).toString(),
      name: newTag.name.trim(),
      color: newTag.color,
    };

    setTags([...tags, newTagItem]);
    setNewTag({ name: "", color: "red" });
    setIsAddingTag(false);
    setTagError("");
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat._id !== id));
  };

  const removeTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Categories & Tags
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Manage case categories and classification tags
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 md:space-x-8">
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm transition-all ${
                activeTab === "categories"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Categories
            </button>
            {/* <button
              onClick={() => setActiveTab("tags")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm transition-all ${
                activeTab === "tags"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tags
            </button> */}
          </nav>
        </div>
      </div>

      {activeTab === "categories" ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Case Categories</h3>
            <button
              onClick={() => {
                setIsAddingCategory(true);
                setNewCategory({ name: "", description: "" });
                setCategoryError("");
              }}
              className="btn btn-primary flex items-center gap-2 btn-sm"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          {/* Add Category Form */}
          {isAddingCategory && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => {
                      setNewCategory({ ...newCategory, name: e.target.value });
                      setCategoryError("");
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="categoryDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="categoryDescription"
                    value={newCategory.description}
                    onChange={(e) => {
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      });
                      setCategoryError("");
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter category description"
                    rows={3}
                  />
                </div>
                {categoryError && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {categoryError}
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingCategory(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCategory}
                    className="btn btn-primary btn-sm flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow pr-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {category.description}
                    </p>
                  </div>
                  {/* <button
                    onClick={() => category._id && removeCategory(category._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Tags</h3>
            <button
              onClick={() => {
                setIsAddingTag(true);
                setNewTag({ name: "", color: "red" });
                setTagError("");
              }}
              className="btn btn-primary flex items-center gap-2 btn-sm"
            >
              <Plus className="w-4 h-4" />
              Add Tag
            </button>
          </div> */}

          {/* Add Tag Form */}
          {/* {isAddingTag && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="tagName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tag Name
                  </label>
                  <input
                    type="text"
                    id="tagName"
                    value={newTag.name}
                    onChange={(e) => {
                      setNewTag({ ...newTag, name: e.target.value });
                      setTagError("");
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter tag name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag Color
                  </label>
                  <div className="flex space-x-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewTag({ ...newTag, color })}
                        className={`w-8 h-8 rounded-full bg-${color}-500 ${
                          newTag.color === color
                            ? "ring-2 ring-offset-2 ring-blue-300"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {tagError && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {tagError}
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingTag(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTag}
                    className="btn btn-primary btn-sm flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Tag
                  </button>
                </div>
              </div>
            </div>
          )} */}

          {/* Tags List */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full bg-${tag.color}-500`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {tag.name}
                  </span>
                </div>
                <button
                  onClick={() => removeTag(tag.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default CategoriesAndTags;


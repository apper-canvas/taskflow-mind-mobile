import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import CategoryItem from '@/components/molecules/CategoryItem'
import AddCategoryForm from '@/components/molecules/AddCategoryForm'

function CategorySidebar({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  onCreateCategory, 
  taskCounts 
}) {
  const [showAddForm, setShowAddForm] = useState(false)

  const defaultCategories = [
    { id: 'all', name: 'All Tasks', icon: 'List', color: '#6B7280' },
    { id: 'today', name: 'Due Today', icon: 'Calendar', color: '#3B82F6' },
    { id: 'overdue', name: 'Overdue', icon: 'AlertCircle', color: '#EF4444' },
    { id: 'completed', name: 'Completed', icon: 'CheckCircle', color: '#10B981' }
  ]

  return (
    <motion.aside 
      className="w-80 bg-surface border-r border-gray-200 flex flex-col"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold font-display text-gray-900 mb-4">
          Categories
        </h2>
        
        {/* Default Categories */}
        <div className="space-y-1 mb-6">
          {defaultCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              taskCount={taskCounts[category.id] || 0}
              onClick={() => onCategoryChange(category.id)}
            />
          ))}
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Custom Categories</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-150"
            >
              <ApperIcon name="Plus" size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Custom Categories */}
          <div className="space-y-1">
            {categories.map((category) => (
              <CategoryItem
                key={category.Id}
                category={{
                  id: category.Id,
                  name: category.name,
                  color: category.color
                }}
                isActive={activeCategory === category.Id}
                taskCount={taskCounts[category.Id] || 0}
                onClick={() => onCategoryChange(category.Id)}
              />
            ))}
          </div>

          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <AddCategoryForm
                  onSubmit={onCreateCategory}
                  onCancel={() => setShowAddForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}

export default CategorySidebar
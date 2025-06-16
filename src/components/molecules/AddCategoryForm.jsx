import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CATEGORY_COLORS = [
  '#5B21B6', '#7C3AED', '#10B981', '#F59E0B', 
  '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'
]

function AddCategoryForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(CATEGORY_COLORS[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({ name: name.trim(), color })
      setName('')
      setColor(CATEGORY_COLORS[0])
      onCancel()
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
          autoFocus
        />
        
        <div>
          <label className="text-xs font-medium text-gray-700 mb-2 block">Color</label>
          <div className="flex space-x-2">
            {CATEGORY_COLORS.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`
                  w-6 h-6 rounded-full border-2 transition-all duration-150
                  ${color === colorOption ? 'border-gray-400 scale-110' : 'border-transparent'}
                `}
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 bg-secondary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-150"
          >
            <ApperIcon name="X" size={16} />
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default AddCategoryForm
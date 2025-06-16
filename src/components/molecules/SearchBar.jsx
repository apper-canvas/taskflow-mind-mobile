import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

function SearchBar({ value, onChange, placeholder }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <div className={`
        flex items-center bg-gray-50 rounded-lg px-3 py-2 transition-all duration-150
        ${isFocused ? 'ring-2 ring-secondary ring-opacity-20 bg-white' : 'hover:bg-gray-100'}
      `}>
        <ApperIcon 
          name="Search" 
          size={18} 
          className={`mr-2 transition-colors duration-150 ${
            isFocused ? 'text-secondary' : 'text-gray-400'
          }`} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none flex-1 text-sm text-gray-900 placeholder-gray-500"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="ml-2 p-1 hover:bg-gray-200 rounded-md transition-colors duration-150"
          >
            <ApperIcon name="X" size={14} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify'
import Layout from '@/Layout'

// Simple Redux store for demo
const store = configureStore({
  reducer: {
    // Add reducers as needed
  }
})

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  )
}

export default App
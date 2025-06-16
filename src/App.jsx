import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/Layout'

function App() {
  return (
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
  )
}

export default App
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AuthProvider>
     <SocketProvider>
     <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      // transition={Bounce}
      />
     </SocketProvider>
    </AuthProvider>,
  </BrowserRouter>

)

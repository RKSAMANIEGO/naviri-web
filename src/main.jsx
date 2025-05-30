import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './core/styles/global.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './features/cart/context/CartContext' // Try absolute path from src

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // Los datos se consideran frescos por 5 minutos.
      cacheTime: 1000 * 60 * 10  // Los datos se mantienen en caché por 10 minutos.
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
)

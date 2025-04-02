<<<<<<< HEAD
import './App.css'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
=======
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";
>>>>>>> origin/anthony

function App() {
  return (
<<<<<<< HEAD
    <>
      {/**<Dashboard/>*/}
       <Products/>
    </>
=======
    
      <BrowserRouter>
        <Router  />
     </BrowserRouter>

>>>>>>> origin/anthony
  )
}
export default App

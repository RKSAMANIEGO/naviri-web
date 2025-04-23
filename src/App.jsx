import { BrowserRouter } from "react-router-dom";
import Router from "./core/router/AppRouter";
import SocialButtons from "./shared/components/SocialButtons/SocialButtons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <BrowserRouter>
        <Router />
        <SocialButtons />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
     </BrowserRouter>
  )
}
export default App

import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";
import SocialButtons from "./components/whatsapp/SocialButtons";

function App() {
  return (
      <BrowserRouter>
        <Router />
        <SocialButtons />
     </BrowserRouter>
  )
}
export default App

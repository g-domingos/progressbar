import { BrowserRouter, HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "./toast";

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Router />
      <Toast />
    </HashRouter>
  );
}

export default App;

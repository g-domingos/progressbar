import { BrowserRouter, HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // basename={window.location.pathname || ""}
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}

export default App;

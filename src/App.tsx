import { BrowserRouter, HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <HashRouter >
      <GlobalStyle />
      <Router />
    </HashRouter>
  );
}

export default App;

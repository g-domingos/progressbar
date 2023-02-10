import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter >
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}

export default App;

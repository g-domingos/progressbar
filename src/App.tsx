import { BrowserRouter, HashRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "./toast";
import { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

function App() {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ setUpdate, update }}>
      <HashRouter>
        <GlobalStyle />
        <Router />
        <Toast />
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;

import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "./toast";
import { createContext, useEffect, useState } from "react";
import { fetchUserAttributes } from "@aws-amplify/auth";

export const UserContext = createContext<any>(null);

function App() {
  const [update, setUpdate] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = () => {
    fetchUserAttributes()
      .then(async (user) => {
        const { profile, family_name } = user;

        if (profile === "CLIENT") {
          navigate("/clients/dashboard/" + family_name);
        }
      })
      .catch(() => {
        navigate("/login");
      });
  };

  useEffect(() => {
    isAuthenticated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ setUpdate, update }}>
      <GlobalStyle />
      <Router />
      <Toast />
    </UserContext.Provider>
  );
}

export default App;

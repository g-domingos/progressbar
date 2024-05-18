import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Router } from "./Router";
import { Toast } from "./toast";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserAttributes } from "@aws-amplify/auth";
import { useApi } from "./hooks/useApi";
import { Slice } from "./context";
import { GlobalStyle } from "./styles/global";

export const UserContext = createContext<any>(null);

function App() {
  const [update, setUpdate] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(Slice) as any;

  const { request } = useApi({ path: `` });

  const getUser = async ({
    userId,
    taskId,
  }: {
    userId: string;
    taskId: string;
  }) => {
    return request({
      method: "get",
      pathParameters: `/task/${taskId}/users/${userId}`,
    }).then((response: any) => {
      setUser(response);
      return response;
    });
  };

  const isAuthenticated = () => {
    fetchUserAttributes()
      .then(async (user) => {
        const { profile, family_name = "", given_name, sub = "" } = user;
        if (profile === "CLIENT") {
          getUser({ userId: sub, taskId: family_name }).then((response) => {
            if (response?.permission === "no") {
              navigate("/clients/progress/" + family_name);
            } else {
              navigate("/clients/dashboard/" + family_name);
            }
          });
          return;
        }

        navigate("/admin");
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
      {/* <GlobalStyle /> */}
      <Router />
      <Toast />
    </UserContext.Provider>
  );
}

export default App;

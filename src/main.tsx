import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import colors from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./context";

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Context>
        <App />
      </Context>
    </ChakraProvider>
  </BrowserRouter>
);

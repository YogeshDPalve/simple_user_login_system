import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider";
import { Provider } from "react-redux";
import { appStore, persistor } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <StrictMode>
      <Provider store={appStore}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </StrictMode>
  </ThemeProvider>
);

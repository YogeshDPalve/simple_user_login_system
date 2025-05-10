import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassoword from "./pages/ForgotPassoword";
import SendOtp from "./pages/SendOtp";
import Dashboard from "./pages/Dashboard";
import {
  AuthenticatedUser,
  ProtectedRoutes,
} from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticatedUser>
                <Login />
              </AuthenticatedUser>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password/send-otp" element={<SendOtp />} />
          <Route path="/reset-password" element={<ForgotPassoword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SignupComponent } from "./pages/Signup";
import { SigninComponent } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ui/ProtextRoute";
import { Redirect_home } from "./pages/Redirect_home";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./hooks/useToast";
import { ToastContainer } from "./components/ui/Toast";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="/signin" element={<SigninComponent />} />
              <Route path="/" element={<Redirect_home />} />
              <Route
                path="/Home"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </RecoilRoot>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignupComponent } from "./pages/Signup";
import { SigninComponent } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ui/ProtextRoute";
import { Redirect_home } from "./pages/Redirect_home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupComponent />}></Route>
        <Route path="/signin" element={<SigninComponent />}></Route>
        <Route path="/" element={<Redirect_home></Redirect_home>}></Route>
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

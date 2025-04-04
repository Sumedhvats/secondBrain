import { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { InputElement } from "../components/ui/Input";
import { BACKENDURL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ import Link

export const SignupComponent = () => {
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKENDURL}/api/v1/auth/signup`, {
        username,
        password,
      });

      alert(response.data.message || "Signup successful"); // ✅ success alert
      navigate("/signin");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unknown error";
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[800px] flex">
        <div className="w-1/2 pr-8">
          <img
            src="/SignUpImage.png"
            alt="Night scene"
            className="w-full rounded-xl h-full"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Hello!
            <br />
            Good Morning
          </h2>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Create account
          </h3>
          <div className="mb-4">
            <InputElement
              placeholder="Username"
              type="text"
              reference={userNameRef}
            />
          </div>
          <div className="mb-8">
            <InputElement
              placeholder="Password"
              type="password"
              reference={passwordRef}
            />
          </div>
          <div className="w-full">
            <Button
              type="primary"
              size="md"
              onclick={handleClick}
              text="Create account"
              loading={loading}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already Signed up?{" "}
            <Link to="/signin" className="text-[#7755c5]">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

import { Button } from "../components/ui/button";
import { InputElement } from "../components/ui/Input";

export const SignupComponent = () => {
  return (
        <div className="w-screen h-screen  flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg  w-[800px] flex ">
            <div className="w-1/2 pr-8 ">
              
                <img src="/SignUpImage.png" alt="Night scene" className="w-full rounded h-full " />
               
            </div>
            <div className="w-1/2 flex flex-col justify-center p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hello!<br />Good Morning</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Login your account</h3>
              <div className="mb-4">
                <InputElement placeholder="Username" type="text" onChange={() => {}} />
              </div>
              <div className="mb-2">
                <InputElement placeholder="Password" type="password" onChange={() => {}} />
              </div>
              <div className="flex justify-end">

              <a href="#" className="text-sm  text-[#7755c5] mb-4">Forgot password?</a>
              </div>
              <div className="w-full">
                <Button type="primary" size="md" onclick={() => {}} text="Login" />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Don't have an account? <a href="#" className="text-[#7755c5]">Create Account</a>
              </p>
            </div>
          </div>
        </div>
      );
    };
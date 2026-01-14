import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../service/All-API';
import { userContext } from '../contextAPI/Authcontext';

const Auth = ({ insideRegister }) => {
  const [inputData, setInputData] = useState({
    name: "", email: "", password: ""
  });

  const { login } = useContext(userContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (inputData.name && inputData.email && inputData.password) {
      try {
        console.log(inputData);
        const result = await register(inputData);
        console.log(result);

        if (result.status === 201) {
          alert(`Welcome ${result.data.newUser?.name}, Please Login`);
          setInputData({ name: "", email: "", password: "" });
          setTimeout(() => navigate('/login'), 1300);
        }
        else if (result.status === 409) {
          alert(result.data.message);
          setInputData({ name: "", email: "", password: "" });
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Provide all details");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputData.email && inputData.password) {
      try {
        const result = await login(inputData);
        console.log(result);

        if (result.success) {
          alert("Login successful!");
          navigate("/");
          setInputData({ name: "", email: "", password: "" });
        } else if (result.success === false) {
          alert(result.message)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <section className="bg-white min-h-screen flex flex-col">
      <div className="flex justify-center items-center  py-12">
        <div className="border rounded-md p-8 w-full max-w-md shadow-sm">
          <h2 className="text-2xl font-bold mb-6">{insideRegister ? "Register" : "Login"}</h2>

          <form action="#">
            {insideRegister &&
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={inputData.name}
                  onChange={e => setInputData({ ...inputData, name: e.target.value })}
                  type="text"
                  className="w-full border-b border-gray-300 outline-none py-2"
                  placeholder="Enter your name"
                />
              </div>
            }

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                value={inputData.email}
                onChange={e => setInputData({ ...inputData, email: e.target.value })}
                type="text"
                className="w-full border-b border-gray-300 outline-none py-2"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                value={inputData.password}
                onChange={e => setInputData({ ...inputData, password: e.target.value })}
                type="password"
                className="w-full border-b border-gray-300 outline-none py-2"
                placeholder="Enter password"
              />
            </div>

            {insideRegister ?
              <>
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="w-full bg-[#eaa739] text-white py-2 rounded-md hover:bg-[#d7952b]"
                >
                  REGISTER
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an account?
                  <a href="/login" className="text-[#eaa739] hover:underline"> Login </a>
                </p>
              </>
              :
              <>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full bg-[#eaa739] text-white py-2 rounded-md hover:bg-[#d7952b]"
                >
                  LOGIN
                </button>

                <p className="text-sm text-center mt-4">
                  Don’t have an account?
                  <a href="/register" className="text-[#eaa739] hover:underline"> Create an account</a>
                </p>
                <p className="text-sm text-center mt-4">
                  <a></a>
                </p>
              </>
            }

          </form>
        </div>
      </div>
    </section>
  )
}

export default Auth;

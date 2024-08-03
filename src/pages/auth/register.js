import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/Logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { endpoints, baseURL } from "../../api/api";
import Stepper from "../../components/step/Stepper";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usernameRgx = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const passwordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%%]){8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    const result = usernameRgx.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = passwordRgx.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, email, firstName, lastName]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}${endpoints.createUser}`, {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing or Invalid Input");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="p-8 rounded-lg shadow-md max-w-sm h-[600px] w-[400px] flex flex-col justify-between">
          <div className="flex items-center justify-center mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 h-auto mr-4" // Adjust size as needed
            />
            <div className="text-lg">
              <span className="text-custom-red font-bold">Tech</span> Forum
            </div>
          </div>
          <Stepper steps={steps} currentStep={step} />
          <form
            onSubmit={handleRegister}
            className="flex flex-col flex-grow space-y-4"
          >
            <div className="flex-grow overflow-auto">
              {step === 1 && (
                <>
                  <div className="relative">
                    <label
                      htmlFor="first_name"
                      className="block text-black mb-1"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full"
                      required
                    />
                  </div>
                  <hr className="my-4 border-zinc-700 " />
                  <div className="relative">
                    <label
                      htmlFor="last_name"
                      className="block text-black mb-1"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full"
                      required
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="relative">
                    <label
                      htmlFor="username"
                      className="block text-black text-base mb-1"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      value={username}
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full"
                      aria-describedby="uidnote"
                      aria-invalid={validName ? "false" : "true"}
                      onFocus={() => setNameFocus(true)}
                      onBlur={() => setNameFocus(false)}
                      required
                    />
                    <span
                      className={
                        validName
                          ? "valid absolute right-4 top-1/2 transform -translate-y-1/2"
                          : "hide absolute right-4 top-1/2 transform -translate-y-1/2"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validName || !username
                          ? "hide absolute right-4 top-1/2 transform -translate-y-1/2"
                          : "invalid absolute right-4 top-1/2 transform -translate-y-1/2"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <p
                    id="uidnote"
                    className={
                      nameFocus && username && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    5 to 25 characters!
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-black mb-1 text-base"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-black mb-1 text-base"
                    >
                      Password:
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full"
                      required
                    />
                    <span
                      className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-500"
                disabled={step === 1}
              >
                Previous
              </button>
              {step === 2 ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
                >
                  Register
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

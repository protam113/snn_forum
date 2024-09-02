import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { useTheme } from "../../context/themeContext";
import LocationSelector from "../../components/Location/LocationSelector";

const usernameRgx = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const passwordRgx = /^(?=.*[A-Z])(?=.*[@!#%])[A-Za-z\d@!#%]{8,24}$/;

const Register = () => {
  const { theme } = useTheme();
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState({
    province: "",
    district: "",
  });
  const [about, setAbout] = useState("");
  const [profile_image, setProfileImage] = useState(null);
  const [profile_bg, setProfileBg] = useState(null);
  const [link, setLink] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [profileBgPreview, setProfileBgPreview] = useState("");
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordFocus = () => {
    setPassFocus(true);
  };

  const handlePasswordBlur = () => {
    setPassFocus(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [
    username,
    password,
    email,
    firstName,
    lastName,
    phoneNumber,
    location,
    about,
    profile_image,
    profile_bg,
    link,
  ]);

  useEffect(() => {
    if (profile_image) {
      const objectUrl = URL.createObjectURL(profile_image);
      setProfileImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profile_image]);

  useEffect(() => {
    if (profile_bg) {
      const objectUrl = URL.createObjectURL(profile_bg);
      setProfileBgPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profile_bg]);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleProfileBgChange = (e) => {
    setProfileBg(e.target.files[0]);
  };

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setLocation({
      province,
      district,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("location", JSON.stringify(location));
    formData.append("about", about);
    formData.append("link", link);

    if (profile_image) {
      formData.append("profile_image", profile_image);
    }
    if (profile_bg) {
      formData.append("profile_bg", profile_bg);
    }
    try {
      const response = await axios.post(
        `${baseURL}${endpoints.RegisterUser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Registration successful!");
      navigate("/xac_thuc");
    } catch (err) {
      toast.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        const errors = err.response.data;
        if (errors.email) {
          toast.error("Email already in use. Please use a different email.");
        }
        if (errors.phone_number) {
          toast.error(
            "Phone number already in use. Please use a different number."
          );
        }
        if (errors.username) {
          toast.error(
            "Username already taken. Please choose a different username."
          );
        }
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  return (
    <div
      className={` flex items-center justify-center ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="p-8 rounded-lg shadow-md max-w-sm w-full flex flex-col justify-between ">
          <div className="flex items-center justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-16 h-auto mr-4" />
            <div className="text-lg">
              <span className="text-custom-red font-bold">Tech</span> Forum
            </div>
          </div>
          <Stepper steps={steps} currentStep={step} />
          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <div className="flex-grow overflow-auto">
              {step === 1 && (
                <>
                  <div className="relative">
                    <label htmlFor="first_name" className="block mb-1">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      autoComplete="off"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900 "
                      required
                      placeholder="first_name"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="last_name" className="block mb-1">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      autoComplete="off"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      required
                      placeholder="last_name"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="phone_number" className="block mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      autoComplete="off"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      required
                      placeholder="123-456-7890"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="relative">
                    <label htmlFor="username" className="block mb-1">
                      Username:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        aria-describedby="uidnote"
                        aria-invalid={validName ? "false" : "true"}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        required
                      />
                      <span
                        className={
                          validName
                            ? "valid absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-sm"
                            : "hidden absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-sm"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validName || !username
                            ? "hidden absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
                            : "invalid absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
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
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-12"
                      />
                      <span> </span>
                      <span className="text-12">
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </span>
                    </p>
                  </div>

                  <div className="relative">
                    <label htmlFor="password" className="block mb-1">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        aria-describedby="pwdnote"
                        aria-invalid={validPassword ? "false" : "true"}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        required
                        placeholder="Enter your Password!!"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {showPassword ? (
                          <FaEyeSlash
                            onClick={() => setShowPassword(false)}
                            className="cursor-pointer"
                          />
                        ) : (
                          <FaEye
                            onClick={() => setShowPassword(true)}
                            className="cursor-pointer"
                          />
                        )}
                      </span>
                      <span
                        className={
                          validPassword
                            ? "valid absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500 text-sm"
                            : "hidden absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500 text-sm"
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validPassword || !password
                            ? "hidden absolute right-12 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
                            : "invalid absolute right-12 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </div>
                    <p
                      id="pwdnote"
                      className={
                        passFocus && !validPassword
                          ? "instructions text-gray-500 text-sm mt-2"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.
                      <br />
                      Must include at least one uppercase letter and one special
                      character.
                      <br />
                      Allowed special characters: !@#%
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="relative">
                    <label htmlFor="about" className="block mb-1">
                      About:
                    </label>
                    <textarea
                      id="about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="location" className="block mb-1">
                      Location:
                    </label>
                    <LocationSelector
                      selectedProvince={location.province}
                      selectedDistrict={location.district}
                      onLocationChange={handleLocationChange}
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="relative">
                    <label htmlFor="profile_image" className="block mb-1">
                      Profile Image:
                    </label>
                    <input
                      type="file"
                      id="profile_image"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="border rounded-lg w-full bg-gray-50 border-zinc-900"
                    />
                    {profileImagePreview && (
                      <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="mt-2 w-24 h-24 object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="profile_bg" className="block mb-1">
                      Profile Background:
                    </label>
                    <input
                      type="file"
                      id="profile_bg"
                      accept="image/*"
                      onChange={handleProfileBgChange}
                      className="border rounded-lg w-full bg-gray-50 border-zinc-900"
                    />
                    {profileBgPreview && (
                      <img
                        src={profileBgPreview}
                        alt="Profile Background Preview"
                        className="mt-2 w-full h-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex justify-between mb-4">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Previous
                  </button>
                )}
                {step < 4 && (
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Next
                  </button>
                )}
              </div>
              {step === 4 && (
                <button
                  onClick={handleRegister}
                  className="px-8 py-4 bg-green-500 text-white rounded-lg w-full"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

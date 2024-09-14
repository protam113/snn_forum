import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/Logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Stepper from "../../components/step/Stepper";
import { useRegister } from "../../hooks/Auth/useRegister";
import LocationSelector from "../../components/Location/LocationSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/themeContext";

const usernameRgx = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/;
const passwordRgx = /^(?=.*[A-Z])(?=.*[@!#%])[A-Za-z\d@!#%]{8,24}$/;

const Register = () => {
  const { theme } = useTheme();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const { mutate: register, isLoading } = useRegister();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    about: "",
    link: "",
    profile_image: null,
    profile_bg: null,
  });

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
    const result = usernameRgx.test(formData.username);
    setValidName(result);
  }, [formData.username]);

  useEffect(() => {
    const result = passwordRgx.test(formData.password);
    setValidPassword(result);
  }, [formData.password]);

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handlePasswordFocus = () => {
    setPassFocus(true);
  };

  const handlePasswordBlur = () => {
    setPassFocus(false);
  };

  useEffect(() => {
    if (formData.profile_image) {
      const objectUrl = URL.createObjectURL(formData.profile_image);
      setProfileImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.profile_image]);

  useEffect(() => {
    if (formData.profile_bg) {
      const objectUrl = URL.createObjectURL(formData.profile_bg);
      setProfileBgPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.profile_bg]);

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
    setFormData({ ...formData, profile_image: e.target.files[0] });
  };

  const handleProfileBgChange = (e) => {
    setFormData({ ...formData, profile_bg: e.target.files[0] });
  };

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setFormData({
      ...formData,
      location: {
        province,
        district,
      },
    });
  };

  const validateFormData = () => {
    let isValid = true;
    const { username, password, email, firstName, lastName, phoneNumber } =
      formData;

    if (!username || !validName) {
      toast.warn("Vui lòng nhập tên người dùng hợp lệ.");
      isValid = false;
    }
    if (!password || !validPassword) {
      toast.warn("Vui lòng nhập mật khẩu hợp lệ.");
      isValid = false;
    }
    if (!email) {
      toast.warn("Vui lòng nhập email.");
      isValid = false;
    }
    if (!firstName) {
      toast.warn("Vui lòng nhập tên.");
      isValid = false;
    }
    if (!lastName) {
      toast.warn("Vui lòng nhập họ.");
      isValid = false;
    }
    if (!phoneNumber) {
      toast.warn("Vui lòng nhập số điện thoại.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (step === 4) {
      const isValid = validateFormData();
      if (isValid) {
        try {
          await register(formData);

          navigate("/xac_thuc");
        } catch (error) {
          // Xử lý lỗi và hiển thị thông báo
          setErrMsg("Đăng ký không thành công. Vui lòng thử lại.");
        }
      }
    }
  };

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  return (
    <div
      className={`flex items-center justify-center ${
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="flex flex-col space-y-4"
          >
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
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
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
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
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
                        value={formData.username}
                        autoComplete="off"
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        required
                        placeholder="username"
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          validName ? "text-green-500" : "hidden"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          !validName && formData.username
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm ${
                        validName ? "hidden" : "text-red-500"
                      }`}
                    >
                      Username must be 5-24 characters long and contain only
                      letters, numbers, hyphens, or underscores.
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
                        value={formData.password}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        required
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          validPassword ? "text-green-500" : "hidden"
                        }`}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          !validPassword && formData.password
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm ${
                        validPassword ? "hidden" : "text-red-500"
                      }`}
                    >
                      Password must be 8-24 characters long and include at least
                      one uppercase letter and one special character.
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <LocationSelector onLocationChange={handleLocationChange} />
                  <div className="relative">
                    <label htmlFor="about" className="block mb-1">
                      About:
                    </label>
                    <textarea
                      id="about"
                      value={formData.about}
                      onChange={(e) =>
                        setFormData({ ...formData, about: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      placeholder="About yourself"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="link" className="block mb-1">
                      Link:
                    </label>
                    <input
                      type="text"
                      id="link"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                      placeholder="Link to your profile"
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="relative mb-4">
                    <label htmlFor="profile_image" className="block mb-1">
                      Profile Image:
                    </label>
                    <input
                      type="file"
                      id="profile_image"
                      onChange={handleProfileImageChange}
                      className="border rounded-lg w-full"
                    />
                    {profileImagePreview && (
                      <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="mt-4 w-24 h-24 object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="profile_bg" className="block mb-1">
                      Profile Background Image:
                    </label>
                    <input
                      type="file"
                      id="profile_bg"
                      onChange={handleProfileBgChange}
                      className="border rounded-lg w-full"
                    />
                    {profileBgPreview && (
                      <img
                        src={profileBgPreview}
                        alt="Profile Background Preview"
                        className="mt-4 w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Previous
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Next
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  {isLoading ? "Registering..." : "Register"}
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

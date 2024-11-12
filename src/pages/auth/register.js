import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.svg";
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Stepper from "../../components/step/Stepper";
import { useRegister } from "../../hooks/Auth/useRegister";
import LocationSelector from "../../components/Location/LocationSelector";
import { useTheme } from "../../context/themeContext";
import { useToastDesign } from "../../context/ToastService";

const Register = () => {
  const { theme } = useTheme();
  const userRef = useRef();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
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
  });

  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { addNotification } = useToastDesign();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [step]);

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
      setErrMsg("Vui lòng nhập tên người dùng hợp lệ.");
      isValid = false;
    }
    if (!password || !validPassword) {
      setErrMsg("Vui lòng nhập mật khẩu hợp lệ.");
      isValid = false;
    }
    if (!email) {
      setErrMsg("Vui lòng nhập email.");
      isValid = false;
    }
    if (!firstName) {
      setErrMsg("Vui lòng nhập tên.");
      isValid = false;
    }
    if (!lastName) {
      setErrMsg("Vui lòng nhập họ.");
      isValid = false;
    }
    if (!phoneNumber) {
      setErrMsg("Vui lòng nhập số điện thoại.");
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
          addNotification(
            "Đăng ký không thành công. Vui lòng thử lại.",
            "error"
          );
        }
      }
    }
  };

  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div
      className={`flex items-center justify-center ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="p-8 rounded-lg shadow-md max-w-sm w-full flex flex-col justify-between ">
          <div className="flex items-center justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-16 h-auto mr-4" />
            <div className="text-lg">
              <span className="text-main-blue1 font-bold">H2H Tech</span>{" "}
              <span
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Energy
              </span>
            </div>
          </div>
          {errMsg && (
            <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
              <span>{errMsg}</span>
            </div>
          )}
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
                    <label
                      htmlFor="first_name"
                      className=" mb-1 flex items-center"
                    >
                      First Name:
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
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
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
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
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
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
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
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
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        ref={userRef}
                        value={formData.username}
                        autoComplete="off"
                        onChange={(e) => {
                          const usernameValue = e.target.value;
                          setFormData({ ...formData, username: usernameValue });

                          // Kiểm tra điều kiện hợp lệ cho tên người dùng
                          const isValid = /^[A-Za-z0-9-_]{5,24}$/.test(
                            usernameValue
                          );
                          setValidName(isValid);
                        }}
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        required
                        placeholder="Username"
                      />
                      <span
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                          validName ? "text-green-500" : "hidden"
                        }`}
                      >
                        <FaCheck />
                      </span>
                      <span
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                          !validName && formData.username
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      >
                        <FaTimes />
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        validName || !formData.username
                          ? "hidden"
                          : "text-red-500"
                      }`}
                    >
                      Tên người dùng phải dài từ 5-24 ký tự và chỉ chứa chữ cái,
                      số, dấu gạch ngang hoặc dấu gạch dưới.
                    </p>
                  </div>

                  <div className="relative mt-4">
                    <label htmlFor="password" className="block mb-1">
                      Password:
                      <span className="text-red-500 text-14 ml-1">
                        *Bắt buộc
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={(e) => {
                          const passwordValue = e.target.value;
                          setFormData({ ...formData, password: passwordValue });

                          const isValidPassword =
                            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/.test(
                              passwordValue
                            );
                          setValidPassword(isValidPassword);
                        }}
                        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
                        required
                        placeholder="Password"
                      />
                      <span className="absolute right-10 flex items-center">
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
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                          validPassword ? "text-green-500" : "hidden"
                        }`}
                      >
                        <FaCheck />
                      </span>
                      <span
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                          !validPassword && formData.password
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      >
                        <FaTimes />
                      </span>
                    </div>

                    <p
                      className={`text-sm ${
                        validPassword || !formData.password
                          ? "hidden"
                          : "text-red-500"
                      }`}
                    >
                      Mật khẩu phải dài từ 8-24 ký tự và bao gồm ít nhất một chữ
                      cái viết hoa và một ký tự đặc biệt.
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <br />
                  <LocationSelector onLocationChange={handleLocationChange} />
                  <br />
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
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Next
                </button>
              )}
              {step === 3 && (
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

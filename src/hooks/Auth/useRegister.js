import { useMutation } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";

const validateInputs = ({
  username,
  password,
  email,
  firstName,
  lastName,
  phoneNumber,
  location,
}) => {
  if (!username) return "Vui lòng nhập tên đăng nhập.";
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return "Vui lòng nhập email hợp lệ.";
  }
  if (!firstName) return "Vui lòng nhập họ.";
  if (!lastName) return "Vui lòng nhập tên.";
  if (!phoneNumber) return "Vui lòng nhập số điện thoại.";
  if (!location) return "Vui lòng nhập địa chỉ.";
  return null;
};

const Register = async ({
  username,
  password,
  email,
  firstName,
  lastName,
  phoneNumber,
  location,
  about,
  link,
  profile_image,
  profile_bg,
}) => {
  // Kiểm tra tính hợp lệ trước khi tiếp tục
  const errorMessage = validateInputs({
    username,
    password,
    email,
    firstName,
    lastName,
    phoneNumber,
    location,
  });
  if (errorMessage) {
    toast.error(errorMessage); // Hiển thị lỗi cho người dùng
    return;
  }

  // Tạo FormData sau khi tất cả dữ liệu đã hợp lệ
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("phone_number", phoneNumber);
  formData.append("location", location);
  formData.append("about", about);
  formData.append("link", link);

  if (profile_image) {
    formData.append("profile_image", profile_image);
  }
  if (profile_bg) {
    formData.append("profile_bg", profile_bg);
  }

  try {
    const response = await authApi().post(endpoints.RegisterUser, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const useRegister = () => {
  return useMutation({
    mutationFn: async (registrationData) => {
      return Register(registrationData);
    },
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || error.message || "Registration failed.";
      toast.error(errorMessage);
    },
  });
};

export { useRegister };

// src/hooks/useFormHandler.js
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBlog } from "../../../../hooks/Blog/useBlogs";

const SET_CONTENT = "SET_CONTENT";
const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_VISIBILITY = "SET_VISIBILITY";
const SET_FILE_TYPE = "SET_FILE_TYPE";
const SET_SELECTED_FILES = "SET_SELECTED_FILES";
const SET_LOADING = "SET_LOADING";

// Initial state
const initialState = {
  content: "",
  description: "",
  visibility: "public",
  fileType: "image",
  selectedFiles: [],
  loading: false,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_VISIBILITY:
      return { ...state, visibility: action.payload };
    case SET_FILE_TYPE:
      return { ...state, fileType: action.payload };
    case SET_SELECTED_FILES:
      return { ...state, selectedFiles: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Custom hook
export const useFormHandler = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { mutate: addBlogMutation } = useAddBlog();

  const handleInputChange = (field, value) => {
    dispatch({
      type: field === "content" ? SET_CONTENT : SET_DESCRIPTION,
      payload: value,
    });
  };

  const handleSelectChange = (field, value) => {
    dispatch({
      type: field === "visibility" ? SET_VISIBILITY : SET_FILE_TYPE,
      payload: value,
    });
  };

  const handleFileChange = (file) => {
    const files = [file]; // Chỉ xử lý 1 tệp mỗi lần
    let newFiles = [];
    let totalImages = state.selectedFiles.filter((f) =>
      f.type.startsWith("image/")
    ).length;
    let totalPdfs = state.selectedFiles.filter(
      (f) => f.type === "application/pdf"
    ).length;

    files.forEach((file) => {
      if (state.fileType === "image" && file.type.startsWith("image/")) {
        if (totalImages < 4) {
          newFiles.push(file);
          totalImages++;
        } else {
          alert("Bạn chỉ có thể tải lên tối đa 4 hình ảnh.");
        }
      } else if (state.fileType === "pdf" && file.type === "application/pdf") {
        if (totalPdfs < 1) {
          newFiles.push(file);
          totalPdfs++;
        } else {
          alert("Bạn chỉ có thể tải lên 1 tệp PDF.");
        }
      } else {
        alert("Loại tệp không được hỗ trợ.");
      }
    });

    if (newFiles.length > 0) {
      dispatch({
        type: SET_SELECTED_FILES,
        payload: [...state.selectedFiles, ...newFiles],
      });
    }
  };

  const handleRemoveFile = (index) => {
    dispatch({
      type: SET_SELECTED_FILES,
      payload: state.selectedFiles.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (values) => {
    if (!state.content.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    const formData = new FormData();
    formData.append("content", state.content);
    formData.append("visibility", values.visibility);
    formData.append("description", state.description);
    formData.append("fileType", state.fileType);

    state.selectedFiles.forEach((file) => {
      formData.append("media", file);
    });

    dispatch({ type: SET_LOADING, payload: true });
    try {
      await addBlogMutation(formData, {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          console.error("Error submitting blog:", error);
        },
      });
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return {
    state,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  };
};

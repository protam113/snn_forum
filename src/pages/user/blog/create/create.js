// src/pages/AddBlog.js
import React from "react";
import BlogFrom from "../../../../utils/BlogFrom";
import { useFormHandler } from "./AddBlog";

const Create = () => {
  const {
    state,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  } = useFormHandler();

  return (
    <BlogFrom
      state={state}
      handleInputChange={handleInputChange}
      handleSelectChange={handleSelectChange}
      handleFileChange={handleFileChange}
      handleRemoveFile={handleRemoveFile}
      handleSubmit={() => handleSubmit(state)}
    />
  );
};

export default Create;

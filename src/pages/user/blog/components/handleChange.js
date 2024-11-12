import { message } from "antd";
import axios from "axios";

const useFileUpload = (selectedFiles, setSelectedFiles, onFilesSelected) => {
  const handleImageChange = async ({ fileList }) => {
    const newFiles = fileList.slice(0, 4);
    const isLt5M = newFiles.every((file) => file.size / 1024 / 1024 < 5);

    if (!isLt5M) {
      message.error("Each image must be smaller than 5MB.");
      return;
    }

    const filesToUpload = newFiles.map((file) => file.originFileObj);

    setSelectedFiles(filesToUpload);
    onFilesSelected(filesToUpload);
  };

  const handlePdfChange = async ({ file }) => {
    if (file.size / 1024 / 1024 > 5) {
      message.error("PDF must be smaller than 5MB.");
      return;
    }

    const filesToUpload = [file.originFileObj];

    setSelectedFiles(filesToUpload);
    onFilesSelected(filesToUpload);
  };

  const handleRemoveFile = (file) => {
    const remainingFiles = selectedFiles.filter((f) => f.uid !== file.uid);
    setSelectedFiles(remainingFiles);
    onFilesSelected(remainingFiles);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return { handleImageChange, handlePdfChange, normFile, handleRemoveFile };
};

export default useFileUpload;

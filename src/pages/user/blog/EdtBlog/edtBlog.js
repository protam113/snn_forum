import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../error/load";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { useTheme } from "../../../../context/themeContext";
import { useBlogDetail, useEditBlog } from "../../../../hooks/Blog/useBlog";
import { useToastDesign } from "../../../../context/ToastService";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  tablePlugin,
  InsertTable,
} from "@mdxeditor/editor";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Upload,
  Alert,
  Row,
  Col,
} from "antd";
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EdtBlog = () => {
  const { id: blogId } = useParams();
  const { theme } = useTheme();
  const { addNotification } = useToastDesign();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { mutate: editBlog } = useEditBlog(blogId);
  const { data: blog, isLoading, isError } = useBlogDetail(blogId);
  const [submitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    content: "",
    description: "",
    visibility: "public",
    file_type: "image",
    media: [],
    id_media_remove: [],
  });

  const [markdown, setMarkdown] = useState(formData.description);

  useEffect(() => {
    if (blog) {
      setFormData({
        content: blog.content || "",
        description: blog.description || "",
        visibility: blog.visibility || "public",
        file_type: blog.file_type || "image",
        media: blog.media || [],
        id_media_remove: [],
      });
      setSelectedFiles(blog.media || []);
      setMarkdown(blog.description || "");
    }
  }, [blog]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length <= 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can only upload up to 4 files.");
    }
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove.id) {
      setFormData((prevData) => ({
        ...prevData,
        id_media_remove: [...prevData.id_media_remove, fileToRemove.id],
      }));
    }
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (values) => {
    if (!blogId) {
      addNotification("ID bài viết không hợp lệ.", "warning");
      return;
    }

    try {
      const formDataToSend = {
        ...formData,
        media: selectedFiles,
        ...values,
      };
      await editBlog({
        blogId,
        edtBlog: formDataToSend,
      });
      navigate(-1);
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật blog:",
        error.response?.data || error.message
      );
    }
  };

  const handleDescriptionChange = (newMarkdown) => {
    setMarkdown(newMarkdown); // Cập nhật markdown
    setFormData((prev) => ({ ...prev, description: newMarkdown })); // Cập nhật formData
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (isError) return <p className="text-center text-red-500">{isError}</p>;

  return (
    <div className="flex items-center justify-center px-4 py-2">
      <div className="relative max-w-6xl w-full p-6 rounded-lg">
        <Title level={2}>Chỉnh sửa bài viết</Title>
        <Alert
          message="Hãy chắc chắn rằng mỗi hình ảnh không vượt quá 5MB."
          type="warning"
          showIcon
          className="mb-4"
        />
        <Form onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Trạng Thái">
                <Select
                  id="visibility"
                  value={formData.visibility}
                  onChange={(value) =>
                    setFormData({ ...formData, visibility: value })
                  }
                >
                  <Option value="public">Public</Option>
                  <Option value="private">Private</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="File Type">
                <Select
                  value={formData.file_type}
                  onChange={(value) =>
                    setFormData({ ...formData, file_type: value })
                  }
                  className={`${
                    theme === "dark"
                      ? "bg-zinc-700 text-white border-zinc-600"
                      : "bg-white text-black border-zinc-800"
                  }`}
                >
                  <Option value="image">Image</Option>
                  <Option value="pdf">PDF</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="">
            {/* Hiển thị hình ảnh cũ */}
            {formData.media.map((file) => (
              <div
                key={file.id}
                className="relative overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  src={file.file} // Sử dụng đường dẫn file từ dữ liệu blog
                  alt={`Uploaded file ${file.id}`}
                  className="object-cover w-full h-full"
                />
                <Button
                  type="link"
                  onClick={() => handleRemoveFile(selectedFiles.indexOf(file))}
                  className="absolute top-1 right-1 text-red-500"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            ))}

            {/* Hiển thị tệp được chọn từ file input */}
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                {file?.type?.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="object-cover w-full h-full"
                  />
                ) : file?.type === "application/pdf" ? (
                  <FaFilePdf className="w-full h-full text-gray-600" />
                ) : null}
                <Button
                  type="link"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 text-red-500"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            ))}
          </div>

          <Form.Item>
            <Upload
              multiple
              beforeUpload={(file) => {
                // Handle file selection before upload
                handleFileChange(file);
                return false; // Prevent auto-upload
              }}
              onChange={handleFileClick}
            >
              <Button className="mb-4 p-2 bg-blue-500 text-white rounded">
                Upload Files
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Content">
            <TextArea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className={`${
                theme === "dark"
                  ? "bg-zinc-700 text-white"
                  : "bg-white text-black"
              }`}
              rows={2}
            />
          </Form.Item>

          <Form.Item label="Description">
            <MDXEditor
              key={markdown}
              markdown={markdown} // Không cần dùng key
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertTable />
                    </>
                  ),
                }),
                tablePlugin(),
              ]}
              onChange={handleDescriptionChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-blue-500 text-white rounded"
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EdtBlog;

// src/components/MyForm.js
import React from "react";
import { Form, Input, Button, Row, Col, Select, Upload, Alert } from "antd";
import { FaFileUpload, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, tablePlugin, InsertTable } from "@mdxeditor/editor";

const { Option } = Select;

const BlogFrom = ({
  state,
  handleSubmit,
  handleFileChange,
  handleRemoveFile,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="flex items-center justify-center px-4 py-2">
      <div className="relative max-w-6xl w-full p-6 rounded-lg">
        <Alert
          message="Hãy chắc chắn rằng mỗi hình ảnh không vượt quá 5MB."
          type="warning"
          showIcon
          className="mb-4"
        />

        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Trạng Thái:" name="visibility">
                <Select
                  value={state.visibility}
                  onChange={(value) => handleSelectChange("visibility", value)}
                  className="w-full"
                >
                  <Option value="public">Public</Option>
                  <Option value="private">Private</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="File Type:" name="fileType">
                <Select
                  value={state.fileType}
                  onChange={(value) => handleSelectChange("fileType", value)}
                  className="w-full"
                >
                  <Option value="image">Image</Option>
                  <Option value="pdf">PDF</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Tải Tệp Lên:" className="mb-6">
            <Upload
              multiple
              beforeUpload={(file) => {
                handleFileChange(file);
                return false;
              }}
              className="w-full"
            >
              <Button icon={<FaFileUpload />} className="w-full">
                Tải lên tệp
              </Button>
            </Upload>
          </Form.Item>

          <div className="mb-4 border p-4 rounded-md bg-gray-100">
            {state.selectedFiles.length > 0 ? (
              state.selectedFiles.map((file, index) => (
                <div key={index} className="relative flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {file.type.startsWith("image/") ? (
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover mr-2 rounded" />
                    ) : (
                      <FaFilePdf size={48} className="text-red-600 mr-2" />
                    )}
                    <span>{file.name}</span>
                  </div>
                  <Button type="text" icon={<FaTrashAlt />} onClick={() => handleRemoveFile(index)} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có tệp nào được chọn.</p>
            )}
          </div>

          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item label="Tiêu Đề:" name="title">
                <Input
                  value={state.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Nội Dung:" name="description">
                <MDXEditor
                  markdown={state.description}
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
                  onChange={(newMarkdown) =>
                    handleInputChange("description", newMarkdown)
                  }
                  style={{ width: "100%", height: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={state.loading} className="w-full">
              {state.loading ? "Đang gửi..." : "Gửi"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BlogFrom;

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAlbwhzzoDn6Idphju3dFnlBeLMG2cayUU";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const InputBox1 = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="input-box">
      {loading && <progress style={{ width: "100%" }} />}
      <textarea
        disabled={loading}
        type="text"
        className="w-full border-main-blue2 border"
        placeholder="Nhập để hỏi AI .."
        value={loading ? "Loading..." : input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const MarkdownInput = ({ value, onChange, rows, theme }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [input, setInput] = useState(""); // State for input box
  const [loading, setLoading] = useState(false);

  const sendMessage = async (inputText) => {
    if (!inputText) return; // Ensure input is not empty

    setLoading(true);

    try {
      const result = await model.generateContent(inputText);
      const text = result.response.text();

      setAiResponse(text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("generateContent error: ", error);
    }
  };

  const handleCombinedChange = (event) => {
    if (onChange) onChange(event); // Call the onChange prop if provided
  };

  // Combine value and aiResponse
  const combinedValue = `${value || ""}\n\n${aiResponse || ""}`;

  return (
    <div>
      <InputBox1
        sendMessage={sendMessage}
        loading={loading}
        input={input}
        setInput={setInput}
      />

      <textarea
        value={combinedValue} // Combine value and aiResponse
        onChange={handleCombinedChange}
        rows={rows}
        className={`w-full p-2 border rounded-md ${
          theme === "dark"
            ? "bg-zinc-700 text-white border-zinc-600"
            : "bg-white text-black border-zinc-800"
        }`}
      />
    </div>
  );
};

export default MarkdownInput;

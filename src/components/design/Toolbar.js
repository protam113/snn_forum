import React from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaLink,
} from "react-icons/fa";

const Toolbar = ({ onInsert }) => {
  const insertAtCursor = (style) => {
    switch (style) {
      case "bold":
        onInsert("**bold text**");
        break;
      case "italic":
        onInsert("*italic text*");
        break;
      case "strike":
        onInsert("~~strikethrough text~~");
        break;
      case "h1":
        onInsert("# Heading 1");
        break;
      case "h2":
        onInsert("## Heading 2");
        break;
      case "h3":
        onInsert("### Heading 3");
        break;
      case "ul":
        onInsert("- List item");
        break;
      case "ol":
        onInsert("1. List item");
        break;
      case "quote":
        onInsert("> Blockquote");
        break;
      case "code":
        onInsert("```\nCode block\n```");
        break;
      case "link":
        onInsert("[Link text](https://example.com)");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 text-14 bg-white border border-gray-300 rounded-lg shadow-md mb-4">
      <button
        onClick={() => insertAtCursor("bold")}
        title="Bold"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaBold className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("italic")}
        title="Italic"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaItalic className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("strike")}
        title="Strikethrough"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaStrikethrough className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("h1")}
        title="Heading 1"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />1
      </button>
      <button
        onClick={() => insertAtCursor("h2")}
        title="Heading 2"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />2
      </button>
      <button
        onClick={() => insertAtCursor("h3")}
        title="Heading 3"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />3
      </button>
      <button
        onClick={() => insertAtCursor("ul")}
        title="Unordered List"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaListUl className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("ol")}
        title="Ordered List"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaListOl className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("quote")}
        title="Blockquote"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaQuoteRight className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("code")}
        title="Code Block"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaCode className="text-gray-800" />
      </button>
      <button
        onClick={() => insertAtCursor("link")}
        title="Insert Link"
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
      >
        <FaLink className="text-gray-800" />
      </button>
    </div>
  );
};

export default Toolbar;

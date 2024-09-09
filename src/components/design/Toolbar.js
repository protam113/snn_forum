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
  const insertAtCursor = (style, event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
    event.stopPropagation(); // Ngăn chặn sự kiện tiếp tục lên các phần tử cha

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
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-4">
      <button
        onClick={(e) => insertAtCursor("bold", e)}
        title="Bold"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaBold className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("italic", e)}
        title="Italic"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaItalic className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("strike", e)}
        title="Strikethrough"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaStrikethrough className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("h1", e)}
        title="Heading 1"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />1
      </button>
      <button
        onClick={(e) => insertAtCursor("h2", e)}
        title="Heading 2"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />2
      </button>
      <button
        onClick={(e) => insertAtCursor("h3", e)}
        title="Heading 3"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaHeading className="text-gray-800" />3
      </button>
      <button
        onClick={(e) => insertAtCursor("ul", e)}
        title="Unordered List"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaListUl className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("ol", e)}
        title="Ordered List"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaListOl className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("quote", e)}
        title="Blockquote"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaQuoteRight className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("code", e)}
        title="Code Block"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaCode className="text-gray-800" />
      </button>
      <button
        onClick={(e) => insertAtCursor("link", e)}
        title="Insert Link"
        className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
      >
        <FaLink className="text-gray-800" />
      </button>
    </div>
  );
};

export default Toolbar;

import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatbotResponse = ({ text }) => {
  const [responseText, setResponseText] = useState("");
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = text;
      setResponseText(data);
      setParsedContent(parseText(data));
    };

    fetchData();
  }, [text]);

  const parseText = (text) => {
    const sections = [];
    const lines = text.split("\n");

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index].trim();

      if (line.startsWith("•")) {
        sections.push({ type: "list", content: line.slice(1).trim() });
      } else if (line.startsWith("```")) {
        const codeBlock = [];
        index++;
        while (index < lines.length && !lines[index].startsWith("```")) {
          codeBlock.push(lines[index]);
          index++;
        }
        sections.push({ type: "code", content: codeBlock.join("\n") });
      } else if (line.startsWith("{")) {
        try {
          const jsonBlock = [];
          let stack = 0;
          while (index < lines.length) {
            const currentLine = lines[index];

            if (currentLine.includes("{")) stack++;
            if (currentLine.includes("}")) stack--;

            jsonBlock.push(currentLine);

            if (stack === 0) break;

            index++;
          }

          const jsonString = jsonBlock.join("\n");
          const jsonParsed = JSON.parse(jsonString);

          sections.push({
            type: "code",
            content: JSON.stringify(jsonParsed, null, 2),
            language: "json",
          });
        } catch (e) {
          console.error("Error parsing JSON:", e.message);
          sections.push({ type: "paragraph", content: line });
        }
      } else if (line.trim().endsWith(":")) {
        sections.push({ type: "heading", content: line });
      } else if (line.trim() !== "") {
        sections.push({ type: "paragraph", content: line });
      }
    }

    return sections;
  };
  console.log(parsedContent);
  return (
    <div
      style={{ background: "white", padding: "10px" }}
      className="w-full p-6 bg-gray-100 rounded-xl shadow-lg space-y-4"
    >
      {parsedContent.map((section, index) => {
        if (section.type === "heading") {
          return (
            <h3 key={index} className="text-lg font-semibold">
              {section.content}
            </h3>
          );
        } else if (section.type === "list") {
          return (
            <p key={index} className="ml-6 list-disc">
              {section.content}
            </p>
          );
        } else if (section.type === "code") {
          return (
            <SyntaxHighlighter
              key={index}
              language="javascript"
              style={dracula}
              className="rounded-lg"
            >
              {section.content}
            </SyntaxHighlighter>
          );
        } else {
          return (
            <p key={index} className="text-base">
              {section.content}
            </p>
          );
        }
      })}
    </div>
  );
};
export default ChatbotResponse;

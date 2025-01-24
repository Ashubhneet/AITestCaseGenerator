import React, { useState } from "react";
import "tailwindcss";
import axios from "axios"; // Axios is used for API requests
import {
  MARKDOWN_TEST_MESSAGE,
  useMarkdownProcessor,
} from "./UseMarkDownProcessor";

const APIInputForm = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [testResponse, setTestResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setTestResponse(null);

    try {
      // Parse headers and body
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const parsedBody = requestBody ? JSON.parse(requestBody) : null;

      // Payload to be sent to backend
      const payload = { method, url, headers: parsedHeaders, body: parsedBody };

      // Perform API request
      const response = await axios.post(
        "http://localhost:3000/submit",
        payload
      );

      // Set the API response in the testResponse state
      setTestResponse(response.data);
    } catch (error) {
      // Handle API error and set error response
      setTestResponse(
        error.response ? error.response.data : "Error connecting to the server"
      );
      setErrorMessage(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        API Request Tester
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* HTTP Method and URL */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HTTP Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Headers Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Headers (JSON)
          </label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
            className="w-full h-28 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Request Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Request Body (JSON)
          </label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder='{"title": "foo", "body": "bar", "userId": 1}'
            className="w-full h-32 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isLoading ? "Sending..." : "Send API Request"}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {/* Test Response Output */}
        {testResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              API Response
            </h3>
            <pre className="text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}
      </form>
      <AssistantMessage>{MARKDOWN_TEST_MESSAGE}</AssistantMessage>
    </div>
  );
};

export default APIInputForm;

// import { useMarkdownProcessor } from "@/hooks/use-markdown-processor";

export const AssistantMessage = ({ children }) => {
  const content = useMarkdownProcessor(children);

  return (
    <li className="...">
      <p className="...">AI:</p>
      <div className="...">{content}</div>
    </li>
  );
};

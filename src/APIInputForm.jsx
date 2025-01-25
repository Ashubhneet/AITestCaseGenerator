import React, { useState } from "react";
import axios from "axios";
import ChatbotResponse from "./ChatbotResponse";

const APIInputForm = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [successfulResponse, setSuccessfulResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const [testResponse, setTestResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setTestResponse(null);

    try {
      const parsedHeaders = headers;
      const parsedBody = requestBody;
      const parsedSuccessResponse = successfulResponse;
      const parsedErrorResponse = errorResponse;
      const payload = {
        method,
        url,
        headers: parsedHeaders,
        body: parsedBody,
        parsedSuccessResponse,
        parsedErrorResponse,
      };

      const response = await axios.post(import.meta.env.VITE_API_URL, payload);
      setText(response.data.data);

      setTestResponse(response.data);
    } catch (error) {
      console.log(error);
      setTestResponse(
        error.response ? error.response.data : "Error connecting to the server"
      );
      setErrorMessage(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const [text, setText] = useState("");

  return (
    <div className="w-full flex flex-row">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg border border-gray-400 w-1/3">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          API Request Tester
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Response
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Response (JSON)
              </label>
              <textarea
                value={successfulResponse}
                onChange={(e) => setSuccessfulResponse(e.target.value)}
                placeholder='{"title": "foo", "body": "bar", "userId": 1}'
                className="w-full h-32 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error Response (JSON)
            </label>
            <textarea
              value={errorResponse}
              onChange={(e) => setErrorResponse(e.target.value)}
              placeholder='{"title": "foo", "body": "bar", "userId": 1}'
              className="w-full h-32 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-black bg-red-400 rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-blue-300"
            style={{
              backgroundColor: "royalblue",
              color: "white",
            }}
          >
            {isLoading ? "Sending..." : "Send API Request"}
          </button>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}

          {/* {testResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              API Response
            </h3>
            <pre className="text-gray-700 overflow-x-auto whitespace-pre-wrap break-words">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )} */}
        </form>
      </div>

      {text && (
        <div className="w-2/3 ">
          <h1>Response</h1>
          <ChatbotResponse text={text} />
        </div>
      )}
    </div>
  );
};

export default APIInputForm;

import React, { useState } from "react";
import axios from "axios"; // Axios is used for API requests

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

      // Axios request configuration
      // const config = {
      //   method,
      //   url,
      //   headers: parsedHeaders,
      //   data: parsedBody,
      // };
      const payload = {
        method,
        url,
        headers,
        requestBody,
        testResponse,
        isLoading,
        errorMessage,
      };
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        API Request and Response Input
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* HTTP Method and URL */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              HTTP Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">API URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Headers Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Headers (JSON)
          </label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
            className="w-full h-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Request Body */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Request Body (JSON)
          </label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder='{"title": "foo", "body": "bar", "userId": 1}'
            className="w-full h-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          {isLoading ? "Sending..." : "Send API Request"}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {/* Test Response Output */}
        {testResponse && (
          <div className="mt-4 p-4 bg-gray-900 text-white rounded-md">
            <h3 className="text-lg font-bold mb-2">API Response</h3>
            <pre className="overflow-x-auto">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default APIInputForm;

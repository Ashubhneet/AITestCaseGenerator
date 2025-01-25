import { useState } from "react";
import "./App.css";
import APIInputForm from "./APIInputForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <APIInputForm />
    </>
  );
}

export default App;

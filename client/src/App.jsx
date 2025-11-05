import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);

  const fetchMessage = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/message`
      );
      const responseJson = await response.json();
      setMessage(responseJson?.message ?? null);
    } catch (error) {
      console.error(error.message)
    }
  };
  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <h1>This time will never come back</h1>

      {message && <h3>{message}</h3>}
    </>
  );
}

export default App;

import { useState } from "react";
import Header from "./Header";

export default function Task() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  function handleButtonClick() {
    setMessages([...messages, inputValue]);
    setInputValue("");
  }
  return (
    <div>
      <Header>
        <h2>Gerenciador de Tarefas</h2>
      </Header>
      <input
        type="text"
        placeholder="Digite sua tarefa"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Adicionar tarefa</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

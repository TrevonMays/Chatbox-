import './bootstrap.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";


const socket = io.connect("http://localhost:3001");

function App() {
  // Message state
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  // Room state
  const [room, setRoom] = useState("");
  
    const joinRoom = () => {
      if (room !== "") {
        socket.emit("join_room", room);
      }
    };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    })
  }, [socket]);

  return (
    <div className="App">


      
      <input
        placeholder="Room #"
        onChange={(event) => {
          setRoom(event.target.value);
        }}>
      </input>
      <button onClick={joinRoom} > Join Room</button>

      <input
        placeholder='Message please...'
        onChange={(event) => {
          setMessage(event.target.value)
        }} />


      <button onClick={sendMessage}>Send a message</button>

      <h1>Message:</h1>
      
      {messageRecieved}
    </div>
  );
}

export default App;

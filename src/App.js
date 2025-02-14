import { useState,useRef,useEffect } from "react";
import "./App.css";
import { Button, Input } from "reactstrap";
import { FaPen } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Response from "./Response";

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState([]);
  const [id, setId] = useState(null);
  const messageEndRef = useRef(null);
  function submit(e) {
    e.preventDefault();
    setId(null);
    setUser("");
    if (user) {
      setMessage((prev) => [...prev, user, Response(user)]);
    } else {
      setUser("");
    }
  }
  function Edit(e) {
    e.preventDefault();
    message[id]
      ? setMessage((prev) => [
          prev.filter((_, index) => index !== message.length - 1),
          Response(message[id]),
        ])
      : setMessage((prev) =>
          prev.filter((_, index) => index !== id && index !== id + 1)
        );
  }
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#D0F4B2", height: "100vh" }}
    >
      <div className="container d-flex flex-column align-items-center justify-content-center pt-5">
        <div
          className="w-50 d-flex flex-column align-items-center rounded-5 justify-content-center pb-4 pt-4"
          style={{ backgroundColor: "#73D13A" }}
        >
          <h1 style={{ color: "white" }}>ChatBot</h1>
          <div
            className="w-100 p-2"
            style={{ height: '700px', overflowY: "auto",scrollbarWidth:"none" }}
          >
            <ul className="w-100 h-100 p-0">
              {message.map((value, ind) => (
                <li key={ind} className="mb-3 w-100 d-flex" ref={messageEndRef}>
                  {id !== ind ? (
                    <span className="p-2" style={{ width: 200 }}>
                      {value}
                    </span>
                  ) : (
                    <form onSubmit={Edit}>
                      <Input
                        className="p-2"
                        autoFocus
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setMessage((prev) =>
                            prev.map((value, index) =>
                              index === ind ? e.target.value : value
                            )
                          );
                        }}
                        style={{ width: 200 }}
                      />
                    </form>
                  )}
                  {ind % 2 === 0 ? (
                    <FaPen
                      style={{ cursor: "pointer", height: 30 }}
                      className="m-2"
                      onClick={() => {
                        setId((prev) => (prev === ind ? null : ind));
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={submit} className="d-flex gap-3">
            <Input
              type="text"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Button color="success" type="submit" onClick={submit}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

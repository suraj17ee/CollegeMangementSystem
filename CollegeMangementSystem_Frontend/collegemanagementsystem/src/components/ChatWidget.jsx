import React, { useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const isImageUrl = (text) => {
  try {
    const url = new URL(text.trim());
    // Check if the pathname has an image extension (ignoring query params)
    return /\.(png|jpg|jpeg|gif|webp)$/i.test(url.pathname);
  } catch {
    return false;
  }
};

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const prompt = encodeURIComponent(input.trim());
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8096/ai/api/${prompt}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let botReply;

      if (contentType?.includes("application/json")) {
        const data = await response.json();
        botReply = data.reply || JSON.stringify(data);
      } else {
        // Direct text (could be URL or just plain text)
        botReply = (await response.text()).trim();
      }

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Could not reach the server" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <div className={`chat-box ${isOpen ? "open" : "closed"}`}>
        <div className="chat-header" onClick={() => setIsOpen(false)}>
          Chat <span className="close-btn">—</span>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.from === "user" ? "user-msg" : "bot-msg"}
            >
              <b>{msg.from === "user" ? "You" : "Bot"}:</b>{" "}
              {isImageUrl(msg.text) ? (
                <img
                  src={msg.text}
                  alt="Bot Response"
                  style={{
                    maxWidth: "200px",
                    display: "block",
                    marginTop: "5px"
                  }}
                />
              ) : (
                msg.text
              )}
            </div>
          ))}
          {loading && (
            <p className="bot-msg">
              <i>Bot is typing...</i>
            </p>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>

      {!isOpen && (
        <button className="chat-icon" onClick={() => setIsOpen(true)}>
          &#128172;
        </button>
      )}
    </div>
  );
}
import { useEffect, useRef } from "react";
import { ChatWidget, useAgent } from "@koreai/artemis-web-sdk/react";
import { attachDatePickers } from "../datePickers.js";

export default function ChatWindow({ title, variant, onClose, expiredText }) {
  const { isConnected, error } = useAgent();
  const bodyRef = useRef(null);
  const status = error
    ? (expiredText || "We couldn't start the chat. Please try again.")
    : isConnected ? "Connected securely" : "Connecting…";

  // Date fields in chat forms get the Quest calendar (click anywhere in the field to open it).
  useEffect(() => (bodyRef.current ? attachDatePickers(bodyRef.current) : undefined), []);

  return (
    <section className={`chat-window chat-window--${variant}`} aria-label={title}>
      <header className="chat-header">
        <span className="chat-header__title">
          <span className="chat-header__dot" aria-hidden="true" />
          {title}
        </span>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close chat">×</button>
        )}
      </header>
      <div className="chat-body" ref={bodyRef}>
        <p className={error ? "sdk-status error" : "sdk-status"} role="status">{status}</p>
        {!error && <ChatWidget enableFeedback={false} />}
      </div>
    </section>
  );
}

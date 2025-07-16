import React, { useEffect, useRef, useMemo } from "react";

interface ForumMessage {
  id: string;
  consultationId: string;
  senderId: string;
  message: string;
  sender?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessageContainerProps {
  messages: ForumMessage[];
  loading: boolean;
  shouldScrollToBottom: boolean;
  onScrolled: () => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  loading,
  shouldScrollToBottom,
  onScrolled,
}) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  // Memoize the message rendering to prevent unnecessary re-renders
  const messageElements = useMemo(() => {
    if (loading) {
      return <div className="text-black">Loading...</div>;
    }

    if (messages.length === 0) {
      return <div className="text-gray-500 text-black">No posts yet.</div>;
    }

    return messages.map((msg) => (
      <div key={msg.id} className="mb-4 text-black">
        <div className="flex items-center gap-2 mb-1 text-black">
          <span className="font-semibold text-sm text-black">
            {msg.sender?.name || "Unknown"}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              msg.sender?.role === "Doctor"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {msg.sender?.role || "Unknown"}
          </span>
          <span className="text-xs text-gray-400 ml-2">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="text-gray-800 text-sm mb-1 whitespace-pre-line text-black">
          {msg.message}
        </div>
      </div>
    ));
  }, [messages, loading]);

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    // Scroll to bottom if:
    // 1. shouldScrollToBottom is true (triggered by parent)
    // 2. New messages were added (length increased)
    const messagesLengthIncreased =
      messages.length > prevMessagesLengthRef.current;

    if (shouldScrollToBottom || messagesLengthIncreased) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
          onScrolled();
        }
      });
    }

    // Update the previous length reference
    prevMessagesLengthRef.current = messages.length;
  }, [messages, shouldScrollToBottom, onScrolled]);

  return (
    <div
      ref={messageContainerRef}
      className="h-64 overflow-y-auto bg-gray-50 rounded p-2 border text-black flex flex-col"
    >
      {messageElements}
    </div>
  );
};

export default MessageContainer;

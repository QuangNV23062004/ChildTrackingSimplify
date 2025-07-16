import React, { useEffect, useState, useRef, useCallback } from "react";
import { Consultation } from "@/types/consultation";
import api from "@/api/api";
import MessageContainer from "./MessageContainer";

interface ConsultationForumModalProps {
  consultation: Consultation;
  isOpen: boolean;
  onClose: () => void;
  isCompleted?: boolean;
}

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
    // other fields as needed
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const ConsultationForumModal: React.FC<ConsultationForumModalProps> = ({
  consultation,
  isOpen,
  onClose,
  isCompleted,
}) => {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesRef = useRef<ForumMessage[]>([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Improved helper to compare messages deeply
  const areMessagesEqual = useCallback(
    (a: ForumMessage[], b: ForumMessage[]) => {
      if (a.length !== b.length) return false;
      const mapA = new Map(
        a.map((msg) => [msg.id, `${msg.message}|${msg.updatedAt}`])
      );
      const mapB = new Map(
        b.map((msg) => [msg.id, `${msg.message}|${msg.updatedAt}`])
      );
      if (mapA.size !== mapB.size) return false;
      for (const [id, value] of mapA) {
        if (mapB.get(id) !== value) return false;
      }
      return true;
    },
    []
  );

  const fetchMessages = useCallback(async () => {
    try {
      const res = await api.get(
        `/ConsultationMessage/consultation/${consultation.id}`
      );
      const newMsgs = res.data.data || [];

      // Only update if messages are actually different
      if (!areMessagesEqual(newMsgs, messagesRef.current)) {
        const hadMessages = messagesRef.current.length > 0;
        const hasNewMessages = newMsgs.length > messagesRef.current.length;

        setMessages(newMsgs);
        messagesRef.current = newMsgs;

        // Only scroll to bottom if:
        // 1. First load (no previous messages)
        // 2. New messages were added
        if (!hadMessages || hasNewMessages) {
          setShouldScrollToBottom(true);
        }
      }
    } catch (error) {
      // Optionally handle error
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [consultation.id, areMessagesEqual]);

  useEffect(() => {
    if (!isOpen) {
      // Clear interval when modal is closed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setLoading(true);

    // Initial fetch
    fetchMessages();

    // Set up polling interval
    intervalRef.current = setInterval(fetchMessages, 5000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, fetchMessages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await api.post("/ConsultationMessage", {
        ConsultationId: consultation.id,
        Message: newMessage,
      });
      setNewMessage("");

      // Mark that we should scroll to bottom after sending
      setShouldScrollToBottom(true);

      // Refresh messages after send
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  // Memoized callback to handle scroll completion
  const handleScrolled = useCallback(() => {
    setShouldScrollToBottom(false);
  }, []);

  // Sort messages by createdAt ascending (oldest first, newest at bottom)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-black">
        <div className="flex justify-between items-center mb-4 text-black">
          <h2 className="text-xl font-bold text-black">Consultation Forum</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-xl font-bold p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            ×
          </button>
        </div>
        {/* Original request message at the top */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-black">
          <div className="font-semibold mb-1">Request Message</div>
          <div className="text-sm whitespace-pre-line">
            {consultation.request?.message || "No request message."}
          </div>
        </div>
        <div className="mb-4">
          <MessageContainer
            messages={sortedMessages}
            loading={loading}
            shouldScrollToBottom={shouldScrollToBottom}
            onScrolled={handleScrolled}
          />
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full resize-none text-black"
            rows={3}
            placeholder={
              isCompleted
                ? "Consultation has ended. You cannot post new messages."
                : "Ask a question or post an update..."
            }
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={sending || isCompleted}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={sending || !newMessage.trim() || isCompleted}
            >
              {sending ? "Posting..." : "Post"}
            </button>
          </div>
          {isCompleted && (
            <div className="text-xs text-red-500 mt-2">
              This consultation has ended. You can no longer post new messages,
              but you can view the history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationForumModal;

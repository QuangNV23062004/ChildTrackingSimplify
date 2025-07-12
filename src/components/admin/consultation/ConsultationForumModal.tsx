import React, { useEffect, useState, useRef } from "react";
import { Consultation } from "@/types/consultation";
import api from "@/api/api";

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

const ConsultationForumModal: React.FC<ConsultationForumModalProps> = ({ consultation, isOpen, onClose, isCompleted }) => {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/ConsultationMessage/consultation/${consultation.id}`);
        setMessages(res.data.data || []);
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [consultation, isOpen]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await api.post("/ConsultationMessage", {
        ConsultationId: consultation.id,
        Message: newMessage,
      });
      setNewMessage("");
      // Refresh messages
      const res = await api.get(`/ConsultationMessage/consultation/${consultation.id}`);
      setMessages(res.data.data || []);
    } catch {
      // handle error
    } finally {
      setSending(false);
    }
  };

  // Sort messages by createdAt ascending (oldest first, newest at bottom)
  const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-black">
        <div className="flex justify-between items-center mb-4 text-black">
          <h2 className="text-xl font-bold text-black">Consultation Forum</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl font-bold p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">×</button>
        </div>
        {/* Original request message at the top */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-black">
          <div className="font-semibold mb-1">Request Message</div>
          <div className="text-sm whitespace-pre-line">{consultation.request?.message || "No request message."}</div>
        </div>
        <div className="mb-4">
          <div className="h-64 overflow-y-auto bg-gray-50 rounded p-2 border text-black flex flex-col">
            {loading ? (
              <div className="text-black">Loading...</div>
            ) : sortedMessages.length === 0 ? (
              <div className="text-gray-500 text-black">No posts yet.</div>
            ) : (
              sortedMessages.map((msg) => (
                <div key={msg.id} className="mb-4 text-black">
                  <div className="flex items-center gap-2 mb-1 text-black">
                    <span className="font-semibold text-sm text-black">{msg.sender?.name || "Unknown"}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${msg.sender?.role === 'Doctor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{msg.sender?.role || "Unknown"}</span>
                    <span className="text-xs text-gray-400 ml-2">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-gray-800 text-sm mb-1 whitespace-pre-line text-black">{msg.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full resize-none text-black"
            rows={3}
            placeholder={isCompleted ? "Consultation has ended. You cannot post new messages." : "Ask a question or post an update..."}
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
            <div className="text-xs text-red-500 mt-2">This consultation has ended. You can no longer post new messages, but you can view the history.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationForumModal; 
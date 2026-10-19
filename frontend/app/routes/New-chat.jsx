import { ChatInput } from "../components/Chat";

export default function NewChat() {
  return (
    <main className="chat-container">
        <p>Start a new conversation 🔥</p>
      <ChatInput messages={[]} />
    </main>
  );
}
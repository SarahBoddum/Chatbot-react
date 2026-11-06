import { useActionData, redirect } from "react-router";
import { ChatInput, ChatMessages } from "../components/Chat.jsx";
import {useState} from "react";
import { apiFetch } from "../lib/apiFetch.js";

/**
 * CLIENT ACTION FUNCTION
 *
 * Handles creation of new chat threads with their first message.
 * Key concepts:
 * 1. MULTIPLE MUTATIONS: Creates both thread and first message
 * 2. SEQUENTIAL OPERATIONS: Thread must be created before message
 * 3. REDIRECT: Navigate to new thread after successful creation
 * 4. TITLE GENERATION: Create thread title from first message
 * 5. ERROR HANDLING: Validate input and handle API errors
 *
 * The action runs:
 * - When a Form with method="post" is submitted
 * - Returns a redirect to navigate to the new thread
 */

export async function clientAction({ request }) {
  const formData = await request.formData();
  const content = formData.get("message");

  // Validate message content
  if (!content || !content.trim()) {
    return { error: "Message cannot be empty" };
  }

  // Generate thread title (truncate to 50 chars)
  const title =
    content.trim().length > 50
      ? content.trim().slice(0, 50) + "..."
      : content.trim();

  try {
    // Create the thread and first message
    const threadResponse = await apiFetch("/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content: content.trim(),
      }),
    });

    if (!threadResponse.ok) {
      return {
        error: `Failed to create thread: ${threadResponse.status}`,
      };
    }

    // Get the created thread and message
    const data = await threadResponse.json();

    // Redirect to the new thread
    return redirect(`/chat/${data.thread.id}`);
  } catch (error) {
    return { error: error.message };
  }
}


/**
 * Chat New Route Component
 *
 * Provides a form to start a new conversation.
 * When submitted, creates a thread and redirects to it.
 *
 * Key concepts:
 * 1. DEDICATED ROUTE: Separate route for new chat functionality
 * 2. CLEAN URL: /chat/new is semantic and user-friendly
 * 3. FORM SUBMISSION: Uses ChatInput component with Form
 * 4. ERROR DISPLAY: Shows validation or API errors to user
 */
export default function ChatNew() {
  // Access action result for error display
  const actionData = useActionData();
  const [theme, setTheme] = useState("light");

  return (
    <main className="chat-container">
      <div className="chat-thread-header">
        <h2>Start a new conversation</h2>
        <p>Type a message below to begin chatting</p>
      </div>
      <ChatMessages  theme={theme}/>
      <ChatInput theme={theme} setTheme={setTheme}  />
      {actionData?.error && (
        <div className="error-message">{actionData.error}</div>
      )}
    </main>
  );
}

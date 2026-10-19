import React from "react";
import { Form } from "react-router";

/**
 * Chat Components
 *
 * This file contains all chat-related components for the messaging interface.
 * It demonstrates:
 * 1. LOGICAL GROUPING: Related components organized in the same file
 * 2. COMPONENT HIERARCHY: Message -> ChatMessages -> ChatInput
 * 3. EXPORT PATTERNS: Multiple named exports from a single file
 * 4. REUSABLE MODULES: Components that can be imported anywhere in the app
 * 5. HOOKS USAGE: Components now use React hooks for state management
 */

/**
 * Message Component
 *
 * Now uses PROPS DESTRUCTURING with default values! Key concepts:
 * 1. DESTRUCTURING: Extract specific props directly from the props object
 * 2. DEFAULT VALUES: Provide fallback values if props are undefined
 * 3. CLEANER CODE: No need to repeat "props." throughout the component
 * 4. SELF-DOCUMENTING: Shows exactly which props the component expects
 */
function Message({ type = "user", children }) {
  return (
    <div className={`message ${type}-message`}>
      <div className="message-content">{children}</div>
    </div>
  );
}

/**
 * ChatMessages Component
 *
 * Now uses DESTRUCTURING WITH DEFAULT VALUES for safety! Key concepts:
 * 1. DESTRUCTURING: Extract messages directly from props object
 * 2. DEFAULT VALUES: messages = [] prevents errors if prop is undefined
 * 3. ERROR PREVENTION: No more "Cannot read property 'map' of undefined"
 * 4. GRACEFUL DEGRADATION: Component renders empty list if no messages provided
 * 5. CLEANER CODE: Direct access to messages instead of props.messages
 */
function ChatMessages({ messages = [] }) {
  return (
    <div className="chat-messages">
      {/* Using destructured messages with safe default! */}
      {messages.map((message) => (
        <Message key={message.id} type={message.type}>
          {message.content}
        </Message>
      ))}
    </div>
  );
}

/**
 * ChatInput Component
 *
 * Form component that handles user input for sending messages.
 * Now uses React Router Form for data mutations:
 * 1. FORM COMPONENT: React Router's Form for seamless data mutations
 * 2. METHOD="POST": Triggers the route's clientAction when submitted
 * 3. AUTOMATIC REVALIDATION: Data refreshes after successful submission
 * 4. NO STATE NEEDED: Form clears and data reloads automatically
 * 5. DECLARATIVE: Just render the form, React Router handles the rest
 */
function ChatInput() {
  return (
    <div className="chat-input-container">
      <Form method="post" className="chat-input-wrapper">
        <textarea
          name="message"
          className="chat-input"
          placeholder="Type your message here..."
          rows="1"
          required
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </Form>
    </div>
  );
}

/**
 * Named Exports
 *
 * We export each component individually so they can be imported separately
 * if needed. This provides flexibility in how components are used.
 */
export { Message, ChatMessages, ChatInput };

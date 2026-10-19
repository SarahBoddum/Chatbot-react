import React from "react";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

/**
 * INITIAL MESSAGES DATA
 *
 * This data will be moved to component state to demonstrate:
 * 1. STATE MANAGEMENT: Converting static data to dynamic state
 * 2. STATE UPDATES: Adding new messages through user interaction
 * 3. LIFTING STATE UP: Managing state in parent component
 * 4. CALLBACK PROPS: Passing state update functions to child components
 */
const initialMessages = [
  {
    id: 1,
    type: "user",
    content: "Hello! Can you help me understand React Router v7?",
  },
  {
    id: 2,
    type: "bot",
    content:
      "Of course! React Router v7 is the latest version that introduces several improvements including better data loading, enhanced nested routing, and improved TypeScript support. What specific aspect would you like to learn about?",
  },
  {
    id: 3,
    type: "user",
    content: "How do nested routes work in v7?",
  },
  {
    id: 4,
    type: "bot",
    content:
      "Nested routes in React Router v7 allow you to create hierarchical UI structures. You define parent routes that contain child routes, and use the <Outlet /> component to render child components. The parent route acts as a layout component that wraps its children.",
  },
  {
    id: 5,
    type: "user",
    content: "What's the difference between route() and layout() helpers?",
  },
  {
    id: 6,
    type: "bot",
    content:
      "Great question! The route() helper creates routes that add URL segments, while layout() creates routes that only provide UI structure without affecting the URL. Layout routes are perfect for shared components like sidebars or headers that should appear across multiple pages.",
  },
  {
    id: 7,
    type: "user",
    content: "Can you show me an example of a routes.js configuration?",
  },
  {
    id: 8,
    type: "bot",
    content:
      "Sure! Here's a basic example: You can use route(), index(), and layout() helpers to create nested route structures. The layout() function creates wrapper components, while route() adds URL segments. This approach gives you clean, hierarchical routing that's easy to maintain.",
  },
  {
    id: 9,
    type: "user",
    content: "How do I handle data loading in React Router v7?",
  },
  {
    id: 10,
    type: "bot",
    content:
      "React Router v7 provides excellent data loading capabilities through loader functions. You can define a loader function in your route component that runs before the component renders, ensuring your data is available immediately. You can access the loaded data using the useLoaderData() hook within your component.",
  },
];

/**
 * Home Component (Chat Page)
 *
 * Now demonstrates STATE MANAGEMENT and CALLBACK PROPS:
 * 1. STATE HOOKS: Using useState to manage dynamic messages array
 * 2. CALLBACK FUNCTIONS: Creating functions to update state
 * 3. PROPS PASSING: Passing both data and functions to child components
 * 4. STATE LIFTING: Managing shared state in the parent component
 * 5. IMMUTABLE UPDATES: Using spread operator to update state arrays
 */
export default function Home() {
  // STATE: Convert static data to dynamic state
  const [messages, setMessages] = React.useState(initialMessages);

  // CALLBACK FUNCTION: Add new message to state array
  const addMessage = (content) => {
    const newMessage = {
      id: messages.length + 1, // Simple ID generation
      type: "user",
      content: content,
    };

    // IMMUTABLE UPDATE: Create new array with spread operator
    setMessages([...messages, newMessage]);
  };

  return (
    <main className="chat-container">
      {/* Passing messages state as props - DATA FLOW! */}
      <ChatMessages messages={messages} />
      {/* Passing callback function as props - CALLBACK PROPS! */}
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}

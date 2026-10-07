function SidebarHeader() {
  return (
        <div className="sidebar-header">
          <h2 className="chatbot-title">Chatbot</h2>
          <a href="/chat/new" className="new-chat-btn">
            + New
          </a>
        </div>
        );
};
function SidebarFooter() {
  return (
         <div className="sidebar-footer">
          <a href="/profile" className="user-profile">
            <img
              src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
              alt="User avatar"
              className="user-avatar"
              width={30}
              height={30}
            />
            <span className="user-name">Batman</span>
          </a>
        </div>
        );
};

function ChatThreadItem({ href, title }) {
  return (
    <li className="chat-thread-item">
      <a href={href} className="chat-thread-link">
        {title}
      </a>
    </li>
  );  
}
function ChatThreadList() {
  return (
<ul>
  <ChatThreadItem
  href="/chat/how-to-learn-programming"
  title="How to learn programming?"></ChatThreadItem>

    <ChatThreadItem
  href="/chat/best-pizza-toppings"
  title="What are the best pizza toppings?"></ChatThreadItem>
            
  
    <ChatThreadItem
  href="/chat/explain-quantum-physics"
  title="Can you explain quantum physics?"></ChatThreadItem>
           
  <ChatThreadItem
  href="/chat/morning-routine-ideas"
  title="Help me create a morning routine"></ChatThreadItem>

  <ChatThreadItem
  href="/chat/weekend-activity-suggestions"
  title="What should I do this weekend?"></ChatThreadItem>

    <ChatThreadItem
  href="/chat/why-sky-blues"
  title="Why is the sky blue?"></ChatThreadItem>

      <ChatThreadItem
  href="/chat/learn-new-language"
  title="How do I learn a new language?"></ChatThreadItem>

     <ChatThreadItem
  href="/chat/meaning-of-life"
  title="What's the meaning of life?"></ChatThreadItem>
           
         <ChatThreadItem
  href="/chat/funny-joke-please"
  title="Tell me a funny joke"></ChatThreadItem>

       <ChatThreadItem
  href="/chat/healthy-dinner-ideas"
  title="What's a healthy dinner idea?"></ChatThreadItem>
      
          <ChatThreadItem
  href="/chat/good-book-recommendations"
  title="Recommend me a good book"></ChatThreadItem>

<ChatThreadItem
  href="/chat/creative-writing-prompt"
  title="Give me a creative writing prompt"></ChatThreadItem>

<ChatThreadItem
  href="/chat/fix-slow-computer"
  title="My computer is slow, help?"></ChatThreadItem>

      <ChatThreadItem
  href="/chat/interesting-history-fact"
  title="Tell me an interesting history fact"></ChatThreadItem>
          </ul>
  );
};
  
  


export default function Sidebar() {
  return (
    <>
  <aside className="sidebar">
        <SidebarHeader />
        {/* Chat threads list */}
        <nav className="chat-threads-list" aria-label="Chat threads">
          <ChatThreadList />
        </nav>
        {/* Sidebar footer */}
        <SidebarFooter />
      </aside>
      </>
  );
}
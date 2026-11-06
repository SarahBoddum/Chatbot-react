
import { index, route } from "@react-router/dev/routes";

export default [
  // Routes with sidebar
  route("/", "routes/layout.jsx", [
    index("routes/home.jsx"),
    route("chat/new", "routes/chat-new.jsx"),
    route("chat/:threadId", "routes/chat-thread.jsx", [
      route("edit", "routes/chat-thread-edit.jsx"),
    ]),
  ]),

  // Routes without sidebar
  route("register", "routes/register.jsx"),
  route("login", "routes/login.jsx"),
];

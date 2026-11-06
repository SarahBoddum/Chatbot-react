import { useRouteLoaderData, Form, Link, redirect, useActionData, } from "react-router";
import { apiFetch } from "../lib/apiFetch.js";

export async function clientAction({ params, request }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}/api/threads/${params.threadId}`;

  // Extract form data from the request
  const formData = await request.formData();
  const title = formData.get("title");

  // Validate message content
  if (!title || !title.trim()) {
    return { error: "Title cannot be empty" };
  }

try {
    const response = await apiFetch(
      `/api/threads/${params.threadId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim() }),
      }
    );

    if (!response.ok) {
      return { error: `Failed to update title: ${response.status}` };
    }

    return redirect("..");
  } catch (error) {
    return { error: error.message };
  }
};


export default function ChatThreadEdit() {
  const { thread } = useRouteLoaderData("routes/chat-thread");
  const actionData = useActionData();

  return (
    <>
      <Form method="post">
        <input
          name="title"
          defaultValue={thread.title}
        />

        {actionData?.error && (
          <p className="error-message">
            {actionData.error}
          </p>
        )}

        <button type="submit">Save</button>
      </Form>

      <Link to="..">Cancel</Link>
    </>
  );
};

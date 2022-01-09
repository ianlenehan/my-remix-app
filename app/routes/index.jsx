import { Form, redirect } from "remix";

import { signOut, getUserSession } from "~/utils/session.server";

// https://remix.run/api/conventions#meta
export let meta = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let action = ({ request }) => {
  return signOut(request);
};

export let loader = async ({ request }) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  return null;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to Remix Firebase demo</h2>

        <Form method="post">
          <button type="submit">Sign Out</button>
        </Form>
      </main>
    </div>
  );
}

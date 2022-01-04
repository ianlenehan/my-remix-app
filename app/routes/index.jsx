import { Form, redirect } from "remix";
import { signOut, getUserSession } from "~/utils/session.server";

export let meta = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let loader = async ({ request }) => {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  return null;
};

export let action = ({ request }) => {
  return signOut(request);
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to Remix Firebase Demo</h2>
      </main>

      <Form method="post">
        <button type="submit">Sign Out</button>
      </Form>
    </div>
  );
}

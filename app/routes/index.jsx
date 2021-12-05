import { Form, redirect } from "remix";
import { signOut } from "firebase/auth";
import { auth } from "~/utils/db.server";

export let meta = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let loader = () => {
  if (!auth.currentUser) {
    return redirect("/login");
  }

  return null;
};

export let action = () => {
  return signOut(auth);
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

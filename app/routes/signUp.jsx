import { Form, redirect, Link } from "remix";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/utils/db.server";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  await createUserWithEmailAndPassword(auth, email, password);

  return redirect("/posts");
};

export default function SignUp() {
  return (
    <div className="signup">
      <h1>Sign Up Page</h1>

      <Form method="post">
        <p>
          <label>
            Email
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>

        <button type="submit">Sign Up</button>
      </Form>

      <Link to="/login">Go to Login</Link>
    </div>
  );
}

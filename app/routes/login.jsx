import { Form, Link } from "remix";

import { signIn } from "~/utils/db.server";
import { createUserSession } from "~/utils/session.server";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  const { user } = await signIn(email, password);
  const token = await user.getIdToken();
  return createUserSession(token, "/posts");
};

export default function Login() {
  return (
    <div className="login">
      <h1>Login Page</h1>

      <Form method="post">
        <p>
          <label>
            Email?
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </p>

        <button type="submit">Login</button>
      </Form>

      <Link to="/signup">Create Account</Link>
    </div>
  );
}

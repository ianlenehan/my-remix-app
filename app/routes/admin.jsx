import { Outlet, Link, useLoaderData, redirect } from "remix";
import { getPosts } from "~/post";
import adminStyles from "~/styles/admin.css";
import { auth } from "~/utils/db.server";

export let links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export let loader = () => {
  if (!auth.currentUser) {
    return redirect("/login");
  }

  return getPosts();
};

export default function Admin() {
  let posts = useLoaderData();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

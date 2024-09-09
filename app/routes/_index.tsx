import type { MetaFunction } from '@remix-run/node';
import { Form, Link, redirect } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const action = async () => {
  return redirect('/movies');
};

export default function Index() {
  return (
    <div className="font-sans p-4 space-y-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>

      <div className="flex gap-3 items-center">
        <Link
          to="/movies"
          className="text-blue-700 underline visited:text-purple-900"
        >
          Go to movies
        </Link>
        <Form method="post">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to movies
          </button>
        </Form>
      </div>
    </div>
  );
}

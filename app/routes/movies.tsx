import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Movies' },
    { name: 'description', content: 'List of movies' },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://api.example.com/user');
  const serverSideData = await response.json();

  return {
    serverSideData,
  };
};

export const action = async () => {
  return redirect('/');
};

export default function MoviesRoute() {
  const { serverSideData } = useLoaderData<typeof loader>();
  const [favoriteMovies, setFavoriteMovies] = useState<{
    data: { movies: Array<{ id: string; title: string }> };
  } | null>(null);

  const handleClick = () => {
    fetch('/api/runtime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query ListMovies {
              movie {
                title
              }
            }
          `,
      }),
    })
      .then((response) => response.json())
      .then(setFavoriteMovies);
  };

  return (
    <div className="font-sans p-4 space-y-4">
      <h1 className="text-3xl">Movies</h1>
      <p id="server-side-greeting">Hello, {serverSideData.firstName}!</p>
      {favoriteMovies?.data ? (
        <div>
          <h2>My favorite movies ({favoriteMovies.data.movies.length})</h2>
          <ul className="list-disc mt-4 pl-6 space-y-2" id="movies-list">
            {favoriteMovies.data.movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <button
        id="fetch-movies-button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Make a runtime request
      </button>
      <div className="flex gap-3 items-center">
        <Link
          to="/"
          className="text-blue-700 underline visited:text-purple-900"
        >
          Go to home
        </Link>
        <Form method="post">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to home
          </button>
        </Form>
      </div>
    </div>
  );
}

import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <p id="server-side-greeting">Hello, {serverSideData.firstName}!</p>
      {favoriteMovies?.data ? (
        <div>
          <h2>My favorite movies ({favoriteMovies.data.movies.length})</h2>
          <ul id="movies-list">
            {favoriteMovies.data.movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <button id="fetch-movies-button" onClick={handleClick}>
        Make a runtime request
      </button>
    </div>
  );
}

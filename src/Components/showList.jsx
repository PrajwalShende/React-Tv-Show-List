import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <h2>Show List</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for shows"
      />
      <ul>
        {shows.map((show) => (
          <li key={show.show.id}>
            <Link to={`/details/${show.show.id}`}>{show.show.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;

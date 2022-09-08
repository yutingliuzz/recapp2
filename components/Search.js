import React, { useState } from "react";

function Search({
  setSearchResults,
  setIsSearch,
  isOpen,
  genre,
  recs,
  setRecs,
  watched,
  searchValue,
  setSearchValue,
}) {
  const API_KEY = "1985ea9f71a9f54b4301260f1e18311a";
  const [search, setSearch] = useState("");
  async function result(search) {
    return await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
    ).then(function (res) {
      return res.json();
    });
  }

  async function findSearch(title) {
    setSearchValue(title);

    let newResults = [];
    if (genre === "HOME") {
      newResults = await result(title);
    } else if (genre === "WATCHED") {
      newResults = watched.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(title.toLowerCase()) ||
          movie.original_name?.toLowerCase().includes(title.toLowerCase())
      );
    } else if (genre === "DISCOVER") {
      newResults = recs.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(title.toLowerCase()) ||
          movie.original_name?.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (title.length == 0) {
      setIsSearch(false);
      setSearchResults([]);
    } else {
      setIsSearch(true);
      if (genre === "HOME") setSearchResults(newResults.results);
      else setSearchResults(newResults);
    }
  }
  return (
    <div
      className={`${
        isOpen ? "opacity-80" : ""
      } border-0 rounded-xl pt-10 w-[80vw] flex flex-col justify-center mx-auto`}
    >
      <input
        className={`"w-[80vw] p-5 h-10 border-0 rounded-xl placeholder-italic`}
        placeholder="Find your favorites..."
        onChange={(event) => {
          findSearch(event.target.value);
        }}
        disabled={isOpen}
      />
    </div>
  );
}

export default Search;

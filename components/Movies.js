import React from "react";
import Thumbnail from "./Thumbnail";

function Movies({
  results,
  setOpen,
  title,
  setTitle,
  cont,
  searchResults,
  isSearch,
  isOpen,
  watched,
  recs,
  searchValue,
  setAddMessage,
}) {
  const EmptyResult = () => {
    return (
      <div className="w-[80vw] mx-auto">
        <p className="text-center text-[#F4F4F4]">No movies found . . .</p>
      </div>
    );
  };

  let displayResults = results;

  if (cont === "WATCHED") {
    displayResults = watched;
  } else if (cont === "DISCOVER") {
    displayResults = recs;
  }
  if (isSearch === true && searchValue !== "") {
    displayResults = searchResults;
  }

  return (
    <div
      className={`px-5 my-10 grid ${
        !displayResults || displayResults.length == 0
          ? ""
          : "xl:grid-cols-3 md:grid-cols-2"
      } ${isOpen ? "opacity-50" : ""}`}
    >
      {displayResults && displayResults.length > 0 ? (
        displayResults.map((result) => (
          <Thumbnail
            isOpen={isOpen}
            clickAble={!isOpen}
            title={title}
            setOpen={setOpen}
            key={result.id}
            result={result}
            setTitle={setTitle}
            watched={watched}
            setAddMessage={setAddMessage}
          />
        ))
      ) : (
        <EmptyResult />
      )}
    </div>
  );
}

export default Movies;

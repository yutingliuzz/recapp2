import React, { useState } from "react";
import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import Recs from "./Recs";
import { getMovie } from "../utils/fetchMethods";

function Modal({
  open,
  onClose,
  title,
  emptyTitle,
  setTitle,
  watched,
  setAddMessage,
  watchedNames,
  setRecs,
}) {
  const [error, setError] = useState(true);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  if (!open) return null;
  setAddMessage(`${watched.indexOf(title) === -1 ? "Add" : "Remove"}`);

  async function result() {
    const data = await fetch(
      `http://localhost:8080/recommend?watchedMovie=${
        title.original_name || title.title
      }&maxCount=25`,
      { method: "get" }
    ).then(function (res) {
      if (!res.ok) {
        setError(true);
        return [];
      }
      setError(false);
      return res.json();
    });
    return data;
  }

  async function recMany() {
    const recManyResult = await fetch(
      `http://localhost:8080/recommend-many?recNumber=50`,
      {
        method: "post",
        mode: "cors",
        body: JSON.stringify(watchedNames),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (res) {
      return res.json();
    });
    const movieMetaData = await Promise.all(
      recManyResult.map((movie) => getMovie(movie))
    );
    setRecs(movieMetaData);
  }

  const handleWatched = async () => {
    if (!watched.includes(title) && !watchedNames.includes(title)) {
      watched.push(title);
      watchedNames.push(title.title || title.original_name);
      setAddMessage("Remove");
    } else {
      watched.splice(watched.indexOf(title), 1);
      watchedNames.splice(
        watchedNames.indexOf(title.title || title.original_name),
        1
      );
      setAddMessage("Add");
    }
    await recMany();
  };

  const recResult = result();

  function reset() {
    setTitle({});
    onClose();
    emptyTitle();
  }
  return (
    <div
      className={`fixed z-10  top-[50%] left-[50%] border-0 rounded-sm text-slate-600 bg-[#ebf0f7] -translate-x-[50%] -translate-y-[50%] w-[80vw] ${
        error
          ? "h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] xl:h-[80vh] md:w-[60vw]"
          : "h-[65vh] sm:h-[30vh] sm:top-[20%] md:h-[50vh] md:top-[27%] lg:w-[65vw] lg:top-[27%] xl:w-[50vw]"
      }`}
    >
      <button
        className="cursor-pointer absolute z-10 top-0 text-[#ebf0f7] right-0 p-5"
        onClick={reset}
      >
        <XIcon className="h-5" />
      </button>

      <div
        className={`max-w-[100%] ${
          error ? "" : ""
        } mx-auto relative bg-slate-600 flex-col justify-center`}
      >
        <p className="absolute z-10 left-0 bottom-0 p-5 font-bold text-white">
          {title.title || title.original_name}
        </p>
        {error ? (
          <p></p>
        ) : (
          <p
            onClick={handleWatched}
            className="absolute cursor-pointer z-10 right-3 bottom-3 border-0 rounded-xl p-2 font-bold bg-black text-white"
          >
            {watched.includes(title.title || title.original_name)
              ? "Remove"
              : "Add"}
          </p>
        )}
        <Image
          className="absolute outline-2  opacity-70 -my-44 rounded-sm cursor-default"
          layout="responsive"
          src={
            `${BASE_URL}${title.backdrop_path || title.poster_path}` ||
            `${BASE_URL}${title.poster_path}`
          }
          height={1080}
          width={1920}
        />
      </div>
      <div className="flex flex-col justify-center bg-[#ebf0f7]">
        <h1 className="mt-2 text-lg font-bold text-center">Recommendations</h1>
        {/* //button */}
        <Recs results={recResult} />
      </div>
    </div>
  );
}

export default Modal;

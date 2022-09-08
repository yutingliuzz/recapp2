import Head from "next/head";
import { useState, useEffect } from "react";
import HeaderSection from "../components/HeaderSection";
import Modal from "../components/Modal";
import Movies from "../components/Movies";
import Nav from "../components/Nav";

import { handleResults } from "../utils/fetchMethods";

const watched = [];
const watchedNames = [];

export default function Home({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [isSearch, setIsSearch] = useState("");
  const [content, setContent] = useState("HOME");
  const [result, setResult] = useState([]);
  const [addMessage, setAddMessage] = useState(
    `${watched.indexOf(title) === -1 ? "Add" : "Remove"}`
  );
  const [searchValue, setSearchValue] = useState("");
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    handleResults(results, setResult);
  }, []);

  return (
    <div>
      <Head>
        <title>CS 3254</title>
      </Head>
      <HeaderSection isOpen={isOpen} setContent={setContent} />
      <Nav
        isOpen={isOpen}
        cont={results}
        setContent={setContent}
        content={content}
        setResult={setResult}
        setSearchValue={setSearchValue}
      />
      {/* Deprecated - Search searches through moviedb instead of backend db
      <Search
        setSearchResults={setSearchResults}
        setIsSearch={setIsSearch}
        isOpen={isOpen}
        genre={content}
        recs={recs}
        setRecs={setRecs}
        watched={watched}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      /> */}
      <Movies
        isOpen={isOpen}
        title={title}
        cont={content}
        searchResults={searchResults}
        results={result}
        isSearch={isSearch}
        setOpen={() => {
          setIsOpen(true);
        }}
        setTitle={setTitle}
        finalResults={result}
        watched={watched}
        recs={recs}
        searchValue={searchValue}
        setAddMessage={setAddMessage}
      />
      <Modal
        setTitle={setTitle}
        open={isOpen}
        title={title}
        onClose={() => setIsOpen(false)}
        emptyTitle={() => setTitle({})}
        watched={watched}
        addMessage={addMessage}
        setAddMessage={setAddMessage}
        watchedNames={watchedNames}
        setRecs={setRecs}
      />
    </div>
  );
}

export async function getServerSideProps() {
  let allMovies = await fetch("http://localhost:8080/all-movies").then((res) =>
    res.json()
  );

  return {
    props: {
      results: allMovies.slice(0, 50),
    },
  };
}

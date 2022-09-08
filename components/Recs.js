import React, { useState, useEffect } from "react";
import RecMovie from "./RecMovie";
import { handleResults } from "../utils/fetchMethods";

function Recs({ results }) {
  const [movieArray, setMovieArray] = useState([]);

  useEffect(() => {
    handleResults(results, setMovieArray);
  }, []);

  return (
    <div className="overflow-scroll flex flex-row scrollbar-hide">
      {movieArray.length > 0 ? (
        movieArray.map((d, i) => {
          return (
            <div key={i} className="p-5">
              <RecMovie a={d} />
            </div>
          );
        })
      ) : (
        <div className="text-center mx-auto">
          No Recommendations Available . . .
        </div>
      )}
    </div>
  );
}

export default Recs;

import React from "react";

function TagBox({ text }) {
  return (
    <div className="border-2 rounded-lg  border-black p-2 pl-5 pr-5 w-[35vh] text-center m-2">
      {text}
    </div>
  );
}

export default TagBox;

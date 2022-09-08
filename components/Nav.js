import React from "react";
import { HomeIcon, UserIcon, ThumbUpIcon } from "@heroicons/react/outline";
import HeaderItem from "../components/HeaderItem";
function Nav({ isOpen, cont, setContent, content, setResult, setSearchValue }) {
  return (
    <div className="flex flex-grow justify-evenly mx-auto text-white bg-slate-700 p-6 ">
      <HeaderItem
        isOpen={isOpen}
        title="HOME"
        Icon={HomeIcon}
        cont={cont}
        setContent={setContent}
        content={content}
        setResult={setResult}
        setSearchValue={setSearchValue}
      />
      <HeaderItem
        isOpen={isOpen}
        title="WATCHED"
        Icon={UserIcon}
        cont={cont}
        setContent={setContent}
        content={content}
        setResult={setResult}
        setSearchValue={setSearchValue}
      />
      <HeaderItem
        isOpen={isOpen}
        title="DISCOVER"
        Icon={ThumbUpIcon}
        cont={cont}
        setContent={setContent}
        content={content}
        setResult={setResult}
        setSearchValue={setSearchValue}
      />
    </div>
  );
}

export default Nav;

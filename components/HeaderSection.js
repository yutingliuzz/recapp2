import React from "react";
import Header from "./Header";
import TagBox from "./TagBox";
import Image from "next/image";

import {
  ArrowSmDownIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";
function HeaderSection({ isOpen, setContent }) {
  return (
    <div
      className={`h-[70vh] bg-slate-300 flex flex-col xl:h-[80vh] ${
        isOpen ? "opacity-50" : ""
      }`}
    >
      <Header />

      <div className="md:border-0 rounded-lg flex flex-col mx-auto max-w-lg sm:max-w-7xl ">
        <h1 className="m-4 text-center font-bold text-2xl sm:text-4xl md:text-6xl  text-slate-700 sm:mt-10">
          Movie Recommendations
        </h1>
        <div className="flex flex-col xl:flex-row xl:w-[70vw] items-center mt-2">
          <div className="inline-flex flex-col items-center sm:mt-3 text-lg md:text-xl xl:text-3xl">
            <TagBox text="Your Favorites" />
            <ArrowSmDownIcon className="h-6" />
            <TagBox text="Our Engine" />
            <ArrowSmDownIcon className="h-6" />
            <TagBox text="New Favorites" />
          </div>
          <div className="inline-flex flex-row scale-0 xl:scale-100 sm:mt-3">
            <ArrowNarrowRightIcon className="ml-8 w-40" />
            <div className="ml-6 mr-8">
              <Image
                className="object-contain h-5"
                src="/moviesImage.jpg"
                width={1300}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;

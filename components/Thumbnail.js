import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Thumbnail({
  isOpen,
  result,
  setOpen,
  title,
  setTitle,
  clickAble = false,
  watched,
  setAddMessage,
}) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  function setInfo() {
    if (!clickAble) return;
    setAddMessage(`${watched.indexOf(title) === -1 ? "Add" : "Remove"}`);
    setOpen();
    router.push(`/?movie=${result.title || result.original_name}`, null, {
      shallow: true,
    });
    setTitle(result);
  }
  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return (
    <>
      <div onClick={setInfo} className="group p-2 ">
        <div
          className={`${
            !isOpen ? "cursor-pointer" : ""
          } flex-col justify-center border-2 rounded-md`}
        >
          <p
            className={`absolute  -transform-x-[50%] -transform-y-[50%] xl:w-[30%] xl:h-[25%] w-[90%] p-7 h-[25%] overflow-y-scroll md:w-[45%] md:h-[27%] scrollbar-hide text-xl scale-0   sm:p-6  md:p-4 md:max-w-xl text-white ${
              !isOpen ? "group-hover:scale-100" : ""
            }`}
          >
            {result.overview}
          </p>
          <Image
            className={`${
              !isOpen ? "group-hover:opacity-30 group-hover:-z-10" : ""
            } border-white`}
            layout="responsive"
            src={
              `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`
            }
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(700, 475)
            )}`}
            height={1080}
            width={1920}
          />
        </div>

        <div className="p-2">
          <h2
            className={`mt-1 text-2xl text-white transition-all duration-100 ease-in-out ${
              !isOpen ? "group-hover:font-bold" : ""
            }`}
          >
            {result.title || result.original_name}
          </h2>
          <p
            className={`${
              !isOpen ? "group-hover:opacity-100" : ""
            } opacity-0 pb-2`}
          >
            {result.release_date || result.first_air_date}
          </p>
        </div>
      </div>
    </>
  );
}

export default Thumbnail;

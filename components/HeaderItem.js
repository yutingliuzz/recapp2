import { getMovie } from "../utils/fetchMethods";
function HeaderItem({
  isOpen,
  title,
  Icon,
  cont,
  setContent,
  content,
  setResult,
  setSearchValue,
}) {
  async function handleResults(arr) {
    const movieArrayd = arr;
    const movieMetaData = await Promise.all(
      movieArrayd.map((movie) => getMovie(movie))
    );
    setResult(movieMetaData);
  }
  return (
    <div
      onClick={() => {
        if (!isOpen) {
          setContent(title);
          if (title === "HOME") {
            handleResults(cont);
          } else if (title === "WATCHED") {
            setResult([]);
          }
          setSearchValue("");
        }
      }}
      className={`items-center ${
        !isOpen ? "cursor-pointer" : ""
      } w-20 sm:w-40 flex flex-col group hover:text-white`}
    >
      <Icon
        className={`h-8 mb-1 ${!isOpen ? "group-hover:animate-bounce" : ""}`}
      />
      <p
        className={`uppercase font-bold text-center tracking-widest ${
          content == title ? "opacity-100" : "opacity-0"
        } ${!isOpen ? "group-hover:opacity-100" : ""}`}
      >
        {title}
      </p>
    </div>
  );
}

export default HeaderItem;

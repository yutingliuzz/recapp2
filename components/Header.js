export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center m-5 mt-0 sticky top-0">
      <h1 className="inline-block p-5 text-center text-3xl ml-0 mt-0 mr-4 mb-4 text-slate-800 font-bold cursor-pointer">
        <span>Schmidt</span>
        <span className="text-xl text-slate-600">LABS</span>
      </h1>

      {/* <Image className= "object-contain" src="https://links.papareact.com/ua6" width={200} height={100}/> */}
    </header>
  );
}

import Image from "next/image";

function Header() {
  return (
    <div className="bg-black py-2 px-4 text-white flex items-center justify-center gap-4">
      <div>
        <span className="font-bold text-lg md:text-xl uppercase">
          BRIGHTABS
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-xs uppercase">MADE IN US</span>
        <Image
          src="/svgs/usa.svg"
          alt="USA"
          className="object-contain"
          width={18}
          height={18}
        />
      </div>
    </div>
  );
}

export default Header;

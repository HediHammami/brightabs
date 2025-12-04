function Header() {
  return (
    <div className="bg-black py-2 px-4 flex items-center justify-center">
      <p className="gap-1 text-xs font-extrabold bg-linear-to-br from-white to-[#fcdc6d] bg-clip-text text-transparent">
        Exclusive Holiday Sale{" "}
        <span className="bg-[#C81F2F] px-1 p-0.5 rounded-sm text-white font-medium text-xs">
          UP TO 57% OFF
        </span>
      </p>
    </div>
  );
}

export default Header;

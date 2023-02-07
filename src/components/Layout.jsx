// Layout Component

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <div className="bg-slate-800 w-full flex items-center justify-between h-[8%]">
          <div className="font-extrabold text-white px-10">INTRANET.</div>
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium h-full px-12 flex gap-3 items-center"
          >
            <i class="fa-solid fa-user"></i>
            Se connecter
          </a>
        </div>
        <div className="h-[92%]">{children}</div>
      </div>
    </>
  );
};

export default Layout;

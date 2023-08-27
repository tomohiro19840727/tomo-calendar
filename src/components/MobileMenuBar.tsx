import { Link } from "react-router-dom";


const MobileMenuBar = ( ) => {


  return (
    <>
    <div className="">
<header className="border-b bg-gray-600 h-20">
<div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8">

  <a href="/" className="text-white flex items-center gap-2.5  font-bold text-xl mt-6" >
    管理App
  </a>

  <nav className="gap-12 lg:flex 2xl:ml-16 mt-6">
    <Link  to="/"  className="text-sm font-semibold text-white hover:text-indigo-300 transition duration-100">Home</Link>
    <Link  to="/login"  className="text-sm font-semibold text-white hover:text-indigo-300 transition ml-2 duration-100">Login</Link>
    <Link  to="/logout"  className="text-sm font-semibold text-white hover:text-indigo-300 ml-2 transition duration-100">Logout</Link>

    <Link to="/signup" className="font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700 text-sm mr-1 ml-2">会員登録</Link>

  </nav>
</div>
</header>
</div>
    </>
  );
};

export default MobileMenuBar;

import { Link } from "react-router-dom";


const MenuBar = ( ) => {


  return (
    <>
    <div className="">
<header className="border-b bg-gray-600 h-20">
<div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8">

  <a href="/" className="text-white inline-flex items-center gap-2.5  font-bold text-4xl mt-1" >
    予定管理App
  </a>

  <nav className="gap-12 lg:flex 2xl:ml-16">
    <Link  to="/"  className="text-4xl font-semibold text-white hover:text-indigo-300 transition duration-100 mt-4">Home</Link>
    <Link  to="/login"  className="text-4xl font-semibold text-white hover:text-indigo-300 transition mt-4 duration-100">Login</Link>
    <Link  to="/logout"  className="text-4xl font-semibold text-white hover:text-indigo-300 mt-4 transition duration-100">Logout</Link>

    <Link to="/signup" className="font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700 text-4xl m-4">会員登録</Link>

  </nav>
</div>
</header>
</div>
    </>
  );
};

export default MenuBar;

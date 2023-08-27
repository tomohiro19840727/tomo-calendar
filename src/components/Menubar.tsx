

const MenuBar = ( ) => {


  return (
    <>
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
<header className="mb-8 border-b bg-gray-600">
<div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">

  <a href="/" className="text-white inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" >
    タスク管理アプ
  </a>

  <nav className="gap-12 lg:flex 2xl:ml-16">
    <a href="/"  className="text-3xl font-semibold text-white hover:text-indigo-300 transition duration-100">Login</a>

    <a href="/shop" className="font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700 text-3xl">会員登録</a>

  </nav>
</div>
</header>
</div>
    </>
  );
};

export default MenuBar;

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const MemberLogin:React.FC<{
  setUserId: any,
  setIsAuthenticated: any,
}> = ({ setUserId, setIsAuthenticated,}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ログイン成功時の処理
        // const user = userCredential.user;
        alert('ログインに成功しました');
        localStorage.setItem("isAuthenticated", "true");
        const userId = userCredential.user.uid;
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
        console.log(userId);
        setUserId(userId)
        window.location.href = '/';
      })
      .catch((error) => {
        // ログインエラー時の処理
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert('ログインに失敗しました');
        // エラーメッセージを表示するなどの処理
      });
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

        <form onSubmit={handleLogin} className="mx-auto max-w-lg rounded-lg border">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder='あなたのメールアドレスを入力してください'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder='このサイトで設定したパスワードを入力してください'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <button
              type="submit"
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberLogin;

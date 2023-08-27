import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: any) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 会員登録成功時の処理
        const user = userCredential.user;
        alert('会員登録に成功しました');
        window.location.href = '/';
        // 他の処理を追加
      })
      .catch((error) => {
        // 会員登録エラー時の処理
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('会員登録に失敗しました');
        // エラーメッセージを表示するなどの処理
      });
      
  };


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">会員登録</h2>

        <form className="mx-auto max-w-lg rounded-lg border">
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
                placeholder='パスワードを設定してください'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <button
              onClick={handleSignUp}
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
              Sign Up
              </button>
      </div>
    </form>
  </div>
</div>
);
};

export default Signup;
import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';

const MemberLogout: React.FC<{
  setIsAuthenticated: any
}> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/");
      window.location.reload(); // ログアウト後にページをリロード
    })
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12 bg-h-screen w-full bg-gradient-to-br
    from-violet-300 via-blue-100 to-orange-100'>
    <div className='text-5xl flex justify-center'>
      <br />
      <button className='hover:text-blue-400 px-10 py-4 font-semibold  text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto' onClick={logout}>M.ログアウト</button>
    </div>
    </div>
  )
}

export default MemberLogout;

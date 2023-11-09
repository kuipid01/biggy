/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const checkLogin = (e) => {
    e.preventDefault();
  
    if (name.length === 0 || password.length === 0) {
      setErr('One input is empty');
    } else if (name !== 'biggy' || password !== 'biggy') {
      setErr('Input is not correct. Please check again.');
    } else {
      navigate('/dashboard');
    }
  };
  

  return (
    <div className="bg-purple-100 font-ubuntu flex justify-center items-center h-screen">
    <div className="bg-white flex justify-center items-center flex-col w-96 h-96 rounded-3xl shadow-lg">
      <p className="text-purple-700 mx-auto font-bold text-3xl pt-8">Sign in</p>
      <form className="py-8 px-4">
        <input
          className="w-3/4 text-gray-800 font-semibold text-lg py-2 px-4 rounded-full outline-none border border-gray-200 focus:border-purple-400 mb-6"
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-3/4 text-gray-800 font-semibold text-lg py-2 px-4 rounded-full outline-none border border-gray-200 focus:border-purple-400 mb-6"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{err}</p>
        <button
        onClick={ checkLogin }
          className="cursor-pointer rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 py-2 px-10 font-ubuntu text-lg mt-4 mb-4 mx-auto block shadow-lg"
        >
          Sign in
        </button>
        
      </form>
    </div>
  </div>
  )
}

export default Login
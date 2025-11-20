import React, { useState,useEffect } from 'react'
import {useAuthStore} from "../store/useAuthStore.js"
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx"
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import {Link} from "react-router"

const LoginPage = () => {
const [formdata,setformdata]=useState({
  email:"",
  password:""
})
const {login, isLoggingIn}=useAuthStore()

const handleSubmit=(e)=>{
  e.preventDefault()
  login(formdata);

}

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-[30%] max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimatedContainer>
          <div className='w-full flex flex-col md:flex-row'>

            {/*left side part*/}
            <div className='md:w-full p-8 flex items-center justify-center md:border-r border-slate-600/30'>
            <div className="w-full max-w-md">
              {/*heading txt*/}
              <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome</h2>
                  <p className="text-slate-400">Log in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
{/*email*/}
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className="relative">
                      <MailIcon className='auth-input-icon'/>
                      <input type="email" 
                      value={formdata.email} 
                      onChange={(e)=>setformdata({...formdata,email:e.target.value})}
                      className='input'
                       placeholder='JohnDoe@gmail.com'/>
                    </div>
                  </div>
                  {/*paswd*/}
<div>
                    <label className='auth-input-label'>Password</label>
                    <div className="relative">
                      <LockIcon className='auth-input-icon'/>
                      <input type="password" 
                      value={formdata.password} 
                      onChange={(e)=>setformdata({...formdata,password:e.target.value})}
                      className='input'
                       placeholder='Enter password'/>
                    </div>
                  </div>

                  {/*btn*/}
                  <button className='auth-btn' type='submit' disabled={isLoggingIn}>
                    {isLoggingIn?(
                      <LoaderIcon className='w-full h-5 animate-spin text-center'/>
                    ):(
                      "Login"
                    )}
                  </button>


                </form>
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Dont have an Account? Sign up
                  </Link>
                </div>

            </div>

            </div>

          </div>


        </BorderAnimatedContainer>

      </div>
      
    </div>
  )
}

export default LoginPage

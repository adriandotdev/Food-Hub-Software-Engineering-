import React from 'react'
import {Link} from 'react-router-dom'
import '../SCSS/loginForm.scss';
import InputContainer from '../components/InputContainer'
import Button from '../components/Button'

function Login() {
    return (
        <div className="hero  h-screen mt-12  p-2 flex flex-col gap-4 lg:mt-0 lg:justify-center lg:flex-row lg:p-12">
            
            {/* Title Section */}
             <div className="hero-content flex-col items-center lg:items-start gap-3 flex-shrink-0 z-auto">
                    <h1 className="text-2xl text-pnc font-bold lg:text-4xl xl:text-6xl text-center">Welcome to PNC Cafe</h1>
                    <p className="font-medium text-pnc text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            {/* Login Form */}
            <div className="hero-content gap-6 max-w-4xl w-full ">
               
                <div className="card lg:bordered lg:border max-w-md w-full m-auto p-5 ">
                    <h1 className="card-title font-bold text-xl md:text-2xl text-pnc">Login</h1>
                    <form className="form-control " action="">
                    
                        {/* INPUT FIELDS */}
                        <InputContainer name="id-number" type="text" labelContent="ID Number"/>
                        <InputContainer name="password" type="password" labelContent="Password"/>

                        {/* Login Button */}
                        <section>
                            <Button className="btn bg-pnc w-full hover:bg-pncHover text-lg font-medium text-white md:text-xl" text="Login"/>
                        </section>

                        {/* Link Section */}
                        <section className="flex flex-col items-center self-center mt-2">
                            <small className="text-pnc font-medium text-center sm:text-base">Don't have an account yet? <Link to="/" className="text-pncHover">Sign Up</Link> </small>
                            
                            <small className="text-pnc font-medium text-center sm:text-base" ><Link to="/">Forgot password?</Link></small>
                        </section>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login

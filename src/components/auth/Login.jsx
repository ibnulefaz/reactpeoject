import React, { useState, useContext } from 'react' // ✅ Added useState import
import { Link } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false); // ✅ Simplified call
    const { signInwithEmail } = useContext(AuthContext);

    const handleLoginForm = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.Password.value;

        try {
            // ✅ Use 'signInwithEmail' from the context (Line 😎, not the undefined standalone function
            await signInwithEmail(email, password);
            console.log("Logged in successfully!");
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-950">
            <div className='text-black bg-white max-w-sm p-8 rounded-lg shadow-xl w-full'>
                <h2 className='text-green-800 font-bold text-center text-2xl mb-6'>Login</h2>

                <form className='space-y-4' onSubmit={handleLoginForm}>
                    <div className='relative'>
                        <input
                            type="email"
                            placeholder='Write your email'
                            className='w-full border px-3 py-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
                            name="email"
                            required
                        />
                    </div>

                    <div className='relative flex items-center'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Password'
                            className='w-full border px-4 py-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
                            name="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 text-gray-500'
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button type="submit"
                        className='w-full bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer transition duration-200'>
                        Login
                    </button>
                </form>

                <div className='flex items-center my-6'>
                    <div className='flex-grow h-px bg-gray-300'></div>
                    <span className='mx-4 text-gray-400 text-sm'>OR</span>
                    <div className='flex-grow h-px bg-gray-300'></div>
                </div>

                <div className="space-y-2">
                    <button className='w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 cursor-pointer'>
                        Login with Google
                    </button>
                    <button className='w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 cursor-pointer'>
                        Login with Facebook
                    </button>
                </div>

                <p className='text-gray-500 text-sm text-center mt-6'>
                    Don't have an account? <Link to="/register" className='text-green-800 font-bold hover:underline'>Register Here</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
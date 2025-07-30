import { useNavigate } from 'react-router';
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div id="navbar" className='z-40 fixed top-2 inset-x-0 backdrop-blur-lg flex
    justify-between items-center py-2 px-5 w-[60%] sm:px-20 xl:px-10 border-primary border-2 rounded-[20vw] shadow-gray-400 shadow-lg mx-auto'>
        <img
            src={assets.logo}
            alt="logo"
            className='w-28 sm:w-40 xl:w-44 cursor-pointer transition-transform hover:scale-105'
            onClick={() => navigate("/")}
        />

        { 
            user ? <UserButton />
                : 
                (
                    <button
                        onClick={openSignIn}
                        className='flex items-center gap-2 bg-primary text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:brightness-110 transition-all duration-200 cursor-pointer'>
                        Get Started
                        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                    </button>
                )
        }
        
    </div>
  );
};

export default Navbar;

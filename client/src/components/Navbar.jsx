import { useNavigate } from 'react-router';
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div 
        id="navbar" 
        className='z-40 fixed top-2 inset-x-0 mx-auto flex justify-between items-center rounded-full border-2 border-primary bg-white/30 backdrop-blur-lg shadow-lg 
        w-[80%] p-2 px-10
        md:w-4/5 
        lg:w-3/4'
    >
        <img
            src={assets.logo}
            alt="logo"
            className='w-28 cursor-pointer transition-transform hover:scale-105 md:w-36'
            onClick={() => navigate("/")}
        />

        { 
            user ? <UserButton />
                : 
                (
                    <button
                        onClick={openSignIn}
                        className='flex items-center gap-2 rounded-full bg-primary px-4 py-4 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95 md:px-6 md:py-4.5'
                    >
                        <span className="hidden sm:inline">Get Started</span>
                        <ArrowRight className='h-5 w-5' />
                    </button>
                )
        }
        
    </div>
  );
};

export default Navbar;

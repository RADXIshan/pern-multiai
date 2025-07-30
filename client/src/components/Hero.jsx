import { useNavigate } from "react-router";
import { useUser, useClerk } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Hero = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative flex items-center justify-center w-full min-h-screen bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat">
        <div className="text-black text-center max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Craft Stunning Content <br /> with <span className="text-primary">Next-Gen AI Tools</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-light mb-8">
            Supercharge your workflow with intelligent tools that write, design, and create faster than ever.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
                <button onClick={() => { user ? navigate("/ai") : openSignIn(); }} className="px-6 py-3 bg-primary hover:bg-gray-900 text-white rounded-xl text-base font-semibold transition duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95">
                    Start Creating Now
                </button>
            </div>
            <div className="flex items-center justify-center gap-3 mt-10 text-gray-500 text-sm sm:text-base font-medium">
                <img src={assets.user_group} alt="users" className="h-9 sm:h-10 w-auto" />
                <span className="whitespace-nowrap">
                    Trusted by <strong className="text-gray-700 font-semibold">10k+</strong> creators worldwide
                </span>
            </div>
        </div>
    </div>
  )
}

export default Hero

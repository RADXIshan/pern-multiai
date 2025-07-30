import { useNavigate } from "react-router"
import { AiToolsData } from "../assets/assets"
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTools = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 min-h-[80vh]'>
        <div className="text-center">
            <h2 className="text-slate-700 text-[42px] font-bold">Powerful AI Tools</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Everything you need to create, enhance and optimize your content with cutting-edge AI technology.</p>
        </div>

        <div className="flex flex-wrap mt-10 justify-center">
            {AiToolsData.map((tool, index) => {
                const IconComponent = tool.Icon;
                return (
                    <div
                    key={index}
                    className="p-8 m-4 max-w-xs rounded-xl bg-[#FDFDFE] shadow-xl border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    onClick={() => { user ? navigate(tool.path) : openSignIn() }}
                    >
                        <IconComponent className="h-13 w-13 rounded-xl p-3 text-white mb-4" style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}} />
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">{tool.title}</h3>
                        <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                )
                })}

        </div>
    </div>
  )
}

export default AiTools
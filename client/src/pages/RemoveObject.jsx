import { Sparkles, Scissors } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
        setLoading(true);

        if(object.split(' ').length > 1){
          return toast("Please enter only one object name");
        };

        const formData = new FormData();
        formData.append("image", input);
        formData.append("object", object);

        const { data } = await axios.post("/api/ai/remove-image-object", formData, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        });

        if(data.success){
          setContent(data.content);
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }

      setLoading(false);
    };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <label className="mt-2 block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            required
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700 file:cursor-pointer
                      hover:file:bg-blue-100 cursor-pointer"
          />
        </label>

        <p className="text-sm text-gray-500 font-light mt-1">
          Supports JPG, PNG and other image formats
        </p>

        <p className='mt-6 text-sm font-medium'>Describe object to remove</p>
        <textarea onChange={(e) => setObject(e.target.value)} rows={4} value={object} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to remove in the image...' required />
        <p className='text-sm text-gray-500 font-light mt-0.5'>Be specific about what you want to remove</p>

        <button
          type="submit" disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer active:scale-95 hover:scale-102 transition duration-250'
        >
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> :
              <Scissors className='w-5' />
          }
          Remove Object
        </button>
      </form>


      {/* Right Col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
          <div className='flex items-center gap-3'>
            <Scissors className='w-5 h-5 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>

          {!content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Scissors className='w-9 h-9'/>
                <p>Upload an image and describe what to remove, then click "Remove Object"</p>
              </div>
            </div>
          ) : (
            <div className='mt-3 h-full'>
              <img src={content} alt="background-removed-image" className='w-full h-full' />
            </div>
          )}
      </div>
    </div>
  )
}

export default RemoveObject
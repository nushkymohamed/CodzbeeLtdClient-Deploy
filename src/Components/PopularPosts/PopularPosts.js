import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PopularPosts() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://picsum.photos/v2/list?page=1&limit=10').then((response) => {
      setBlogs(response.data);
    });
  }, []);




  return (
     <>
         <div className={"col-span-2 pt-[20px] md:px-[50px] px-[20px]  shadow-lg min-h-screen overflow-auto"}>
           <h1 className="md:text-xl text-gray-500 font-bold ">Popular Posts</h1>
           {blogs.map((blog, index) => (
               <div className={"flex  py-[10px] gap-[25px] pt-[20px]"}>
               <div key={blog.id}className="md:h-[200px] md:w-[300px] lg:w-full relative ">
                 <img
                     src={blog.download_url}
                     alt={`Image ${blog.id}`}
                     className=" object-cover"
                 />
                   <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full md:text-base text-sm">
                     <h1 className="text-white font-semibold "> Posted By: </h1>
                     <p className="text-gray-200">
                       {blog.author}
                     </p>
                   </div>

               </div>
               </div>
           ))}
         </div>
     </>
  );
}

export default PopularPosts;

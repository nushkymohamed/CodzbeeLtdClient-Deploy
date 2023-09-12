import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserImage from "../../Assets/userAvatar.jpg";


function Contacts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postReactions, setPostReactions] = useState({});

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setUsers(response.data);
    });
  }, []);



// Initialize postReactions with default values
  useEffect(() => {
    const initialReactions = {};
    posts.forEach((post) => {
      initialReactions[post.id] = { likes: 0, dislikes: 0 };
    });
    setPostReactions(initialReactions);
  }, [posts]);



  return (
     <>
         <div className={"col-span-2 pt-[20px] md:px-[50px] px-[20px] shadow-lg"}>
           <h1 className="text-xl text-gray-500 font-bold mb-4">Contacts</h1>
           {users.map((user, index) => (
           <div className={"flex  py-[10px] gap-[25px]"}>
             <div className={"col-span-1 rounded-full"}>
               <img className={"rounded-full md:h-[70px] md:w-[70px] h-[50px] w-[50px]"} src={UserImage} alt="UserImageLogo" />
             </div>
             <div key={user.id} className={"grid gap-[10px] md:text-sm text-xs"}>
                     <span>{user.name}</span>
                     <span>{user.username}</span>
                     <span>{user.email}</span>
             </div>
           </div>
         ))}
         </div>
     </>
  );
}

export default Contacts;

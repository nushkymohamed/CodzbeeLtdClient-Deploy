import React from 'react';
import {AiFillNotification,AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import Logo from "../../Assets/logo.png";
import Profile from "../../Assets/Profile.jpeg";

function WebNavigation() {
  return (
     <>
       <div className={"bg-gray-50 h-[80px] shadow-lg fixed top-0 z-10  w-full"}>
         <div className={"md:px-40 grid md:grid-cols-4 grid-cols-3 "}>
           <div className={"md:pt-[20px] pt-[25px]"}>
             <div className={"hidden md:block"}>
               <div className={"col-span-1 flex md:gap-[20px] gap-[10px] "}>
                 <button>   <AiFillNotification size={25} color={""} /></button>
                 <button>   <AiFillMessage size={25}  color={""}/></button>
                 <button>   <IoSettingsSharp size={25}  color={""}/></button>
               </div>
             </div>
             <div className={"md:hidden block"}>
               <div className={"col-span-1 flex md:gap-[20px] gap-[10px] px-[10px]"}>
                 <button>   <AiFillNotification size={20} color={""} /></button>
                 <button>   <AiFillMessage size={20}  color={""}/></button>
                 <button>   <IoSettingsSharp size={20}  color={""}/></button>
               </div>
             </div>
           </div>


           <div className={"md:col-span-2 col-span-1 flex justify-center items-center md:-ml-0 -ml-[20px]"}>
             <img className={"md:h-[80px] h-[50px]"} src={Logo} alt="Logo" />
           </div>
           <div className={"col-span-1 flex md:gap-[20px] gap-[5px] md:px-[30px] px-[10px]  justify-end items-center"}>
             <div className={"col-span-1 md:pt-[0px] pt-[20px]"}>
              <span className={"font-semibold text-gray-900 md:text-base text-xs"}> Nusky Ansar</span>
             </div>
             <div className={"col-span-1 rounded-full md:pt-[10px] pt-[20px]"}>
               <img className={"md:h-[60px] md:w-[60px] h-[50px] w-[55px] rounded-full"} src={Profile} alt="Logo" />
             </div>
           </div>
         </div>
       </div>

     </>
  );
}

export default WebNavigation;

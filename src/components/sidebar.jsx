import React, { useState, useEffect } from "react";
//import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {Link} from 'react-router-dom'; 
import { FaH, FaMusic } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io"; //this is the trending icon
import { IoIosStats } from "react-icons/io"; //this is the stats icon
import { CiPlay1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import apiClient from '../spotify'; // Import your apiClient if not already imported
import { FaBook } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const SidebarButton = ({ name, icon }) => {
    return (
        <div className='group hover:bg-sky-700 rounded-2xl transition duration-300 ease-in-out'>
            <div className='flex items-center justify-center text-white text-xl py-4 px-4'>
                {icon}
                <p className='pl-2'>{name}</p>
            </div>
        </div>
    );
};



const Sidebar = () => {
    const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'); //this is the spotify user image
    useEffect(() => {
        apiClient.get("me").then((res) => {
            console.log(res); 
            if (res.data.images.url != null) {
                setImage(res.data.images[0].url);
            }
        }
    )}, []);

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/music-player/'; 
        console.log(localStorage.getItem('token'));
    }

    return (
        <div className='fixed left-0 top-0 w-[20%] h-full rounded-sm bg-slate-700 ease-in-out duration-500'>
            {/* Going to have space for the spotify user image here */}
            <div className='flex items-center justify-center p-4 pb-20'>
                <img src={image} className='rounded-full w-20 h-20' />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Link to='/player'>
                    <SidebarButton name='Player' icon={<FaHeart />} />
                </Link>
                <Link to='/library'>
                    <SidebarButton name='Library' icon={<FaBook />} />
                </Link>
                <Link to='/stats'>
                    <SidebarButton name='Stats' icon={<IoIosStats />} />
                </Link>
                <div className="pt-60">
                <Link to='' onClick={handleLogout}>
                    <SidebarButton name='Logout' icon={<IoLogOut />} />
                </Link>
                </div>
            </div>
         </div>
    )
}
export default Sidebar
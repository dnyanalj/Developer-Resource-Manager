import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";

const Navbar = ({userInfo,onSearchNote,handleClearSearch,LoginSignupPage}) => {

    const [searchQuery,setSearchQuery]=useState("");

    const navigate=useNavigate();//this is hook provided by react router dom by which we can redirect without using <Link> 

    const onLogout=()=>{
        localStorage.clear();//remove the token bhai
        navigate("/login");
    };
    const handleSearch=()=>{
        if(searchQuery){
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch=()=>{
        setSearchQuery("");
        handleClearSearch()
    };
return (
    <div>
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            
            <h2 className='text-xl font-medium text-black py-2'>Developer Resource Manager</h2>


            
            


            {userInfo && userInfo.fullName ? (
                <SearchBar
            value={searchQuery}
            onChange={({target})=>{
                setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            ></SearchBar>
            
            ) : (
                <div className="text-gray-500 italic text-sm">
                    Welcome to DRM! Please log in to access more features.
                </div>
            )}

            {/* <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo> */}
            
            {userInfo && userInfo.fullName ? (
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            ) : (
                LoginSignupPage === "loginpage" ? (
                    <Link to="/signup" className="btn-primary px-4 py-1 text-sm w-auto">
                        Signup
                    </Link>
                ) : (
                    <Link to="/login" className="btn-primary px-4 py-1 text-sm w-auto">
                        Login
                    </Link>
                )
            )}
        </div>
    </div>
)
}

export default Navbar

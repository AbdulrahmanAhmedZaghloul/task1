

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/Recruit-logo-lockup.svg';

function Header() {
    const [searchId, setSearchId] = useState('');
    const [debouncedSearchId, setDebouncedSearchId] = useState(searchId);
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchId(searchId);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchId]);

    useEffect(() => {
        if (debouncedSearchId) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`https://reqres.in/api/users/${debouncedSearchId}`);
                    if (response.data.data) {
                        navigate(`/singleHome/user/${debouncedSearchId}`);
                    } else {
                        // You can display a message here if the user is not found
                    }
                } catch (error) {
                    console.log(error);
                    // Handle any errors here
                }
            };

            fetchUser();
        }
    }, [debouncedSearchId, navigate]);

    return (
        <React.Fragment>
            <header className="bg-white shadow-md text-white">
                <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
                    <Link to={'/'} className='w-1/4 md:w-1/6'>
                        <img src={logo} alt="logo" className="w-1/2" />
                    </Link>
                    <motion.div
                        className={`relative flex items-center bg-aliceblue p-1 rounded-full shadow-lg transition-all duration-500 ${isActive ? 'w-12' : 'w-full md:w-80'}`}
                    >
                        <div className='relative flex items-center w-full'>
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="Search by ID"
                                className={`bg-transparent border-none outline-none text-gray-600 transition-all duration-500 ${isActive ? 'w-0' : 'w-full'} px-3 py-2 md:px-4 md:py-2`}
                            />
                            <img
                                src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
                                alt="magnifier"
                                className={`w-6 absolute right-2 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${isActive ? 'w-0 right-0' : 'w-6 right-2'}`}
                                onClick={() => setIsActive(!isActive)}
                            />
                        </div>
                    </motion.div>
                </nav>
            </header>
        </React.Fragment>

    );
}

export default Header;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // استيراد motion من framer-motion
import SyncLoader from 'react-spinners/SyncLoader';
import { Helmet } from 'react-helmet-async';
import logo from '../../assets/Recruit-logo-lockup.svg'
function SingleHome() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`https://reqres.in/api/users/${id}`);
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchUser();
    }, [id]);

    if (!user) return <div className='flex h-[50vh] items-center justify-center'><SyncLoader /></div>;

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={logo} />
                <title> SingleHome</title>
                <meta name="description" content="Abdulrahman Zaghloul" />
                <meta name="author" content="Abdulrahman Zaghloul" />

                <meta name="description" content="I'm Abdulrahman Zaghloul a web designer and web development
          and frontend development
          and React || Nextjs development
          - We create the websites you want according to your taste and choice in proportion to your idea with a professional design and high quality
          - We offer you to write your website content professionally
          - Your websites will be created in a (responsive) format on screens of different sizes
          - You have completed many projects 100%" />
            </Helmet>
            <section className="flex flex-col items-center mt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-2 py-2 text-gray-400"
                >
                     
                    back 

                </button>

                <motion.div
                    className="p-4 mx-auto block rounded-lg shadow-sm shadow-indigo-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        alt={user.first_name}
                        src={user.avatar}
                        className="h-56 w-full rounded-md object-cover"
                    />
                    <div className="mt-2">
                        <p>{user.id}</p>
                        <h1 className="text-xl font-semibold">
                            {user.first_name} {user.last_name}
                        </h1>
                        <p className="text-gray-500">Email: {user.email}</p>
                    </div>
                </motion.div>
            </section>
        </React.Fragment>

    );
}

export default SingleHome;

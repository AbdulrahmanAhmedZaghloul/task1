import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPosts, setPage } from '../../lip/postsSlice';
import SyncLoader from "react-spinners/SyncLoader";
import { Helmet } from 'react-helmet-async';
import logo from '../../assets/Recruit-logo-lockup.svg'

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, page, totalPages, status } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(page));
    }, [dispatch, page]);

    return (
        <React.Fragment>

            <Helmet>
                <link rel="icon" href={logo} />
                <title>Home</title>
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
            <section className="flex justify-center my-4">
                <button
                    onClick={() => dispatch(setPage(page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md text-white"
                >
                    ◄
                </button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => dispatch(setPage(page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md text-white"
                >
                    ►
                </button>
            </section>
            <section className='flex flex-wrap p-5 mx-auto justify-center'>
                {status === 'loading' ? (
                    <div className='flex justify-center items-center h-[50vh]'>
                        <SyncLoader />
                    </div>

                ) : status === 'failed' ? (
                    <p>Error fetching data</p>
                ) : (
                    posts.map((post) => (
                        <Link
                            key={post.id}
                            className="md:w-1/4 p-4"
                            onClick={() => navigate(`/singleHome/user/${post.id}`)}
                        >
                            <motion.div
                                className='relative  group/item mx-auto block rounded-lg shadow-sm shadow-indigo-100 overflow-hidden'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    alt={post.first_name}
                                    src={post.avatar}
                                    className=" group-hover/item:blur-0 blur-sm h-56 w-full rounded-md object-cover"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gray-200 bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <div className="mt-2">
                                        <dl>
                                            <span className='block tracking-wide font-medium'>
                                                ID :: {post.id}
                                            </span>
                                            <span className="tracking-wide font-medium">
                                                Name :: {post.last_name} {post.first_name}
                                            </span>
                                            <div>
                                                <dd className="font-medium">E-mail :: {post.email}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
                    ))
                )}
            </section>
            <section className="flex justify-center my-4">
                <button
                    onClick={() => dispatch(setPage(page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md text-white"
                >
                    ◄
                </button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => dispatch(setPage(page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md text-white"
                >
                    ►
                </button>
            </section>
        </React.Fragment>
    );
}

export default Home;

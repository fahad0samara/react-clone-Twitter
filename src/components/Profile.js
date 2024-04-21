import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            
        }else{
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="banner"
                    className='w-full h-52 object-cover'
                 />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNvZGV8ZW58MHx8MHx8fDA%3D" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p> <p className="text-sm">📱 Passionate about mobile app development with React Native! Building cross-platform applications with a single codebase, unlocking the power of JavaScript to create seamless and performant user experiences.</p></p>
                </div>
            </div>
        </div>
    )
}

export default Profile
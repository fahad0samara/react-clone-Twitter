import React from 'react';
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import {timeSince} from "../utils/constant";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";



const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, { withCredentials: true });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const retweetHandler = async (id) => {
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/retweet/${id}`, { id: user?._id }, { withCredentials: true });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, { withCredentials: true });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
    };

    return (
        <div className='border-b border-gray-200'>
            <div className='flex p-4'>
                <Avatar src={tweet?.userDetails[0]?.avatar} size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username} • ${timeSince(tweet?.createdAt)}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between my-3'>
                        <InteractionButton icon={<FaRegComment size="20px" />} count={0} />
                        <InteractionButton icon={<AiOutlineHeart size="20px" />} count={tweet?.like?.length || 0} onClick={() => likeOrDislikeHandler(tweet?._id)} />
                        <InteractionButton icon={<FaRegBookmark size="20px" />} count={0} />
                        <InteractionButton icon={<AiOutlineRetweet size="20px" />} count={0} onClick={() => retweetHandler(tweet?._id)} />
                        {user?._id === tweet?.userId && <InteractionButton icon={<MdOutlineDeleteOutline size="20px" />} onClick={() => deleteTweetHandler(tweet?._id)} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InteractionButton = ({ icon, count, onClick }) => (
    <div className='flex items-center'>
        <div onClick={onClick} className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
            {icon}
        </div>
        <p>{count}</p>
    </div>
);

export default Tweet;


import { useContext, useCallback , useEffect} from 'react';
import { PostContext } from '../post.context';
import { getFeed ,createPost } from '../services/post.api';

export const usePost = () => {
    const context = useContext(PostContext);

    // 1. Check Provider
    if (!context) {
        throw new Error(
            'usePost must be used within a PostProvider'
        );
    }

    const {
        loading,
        setLoading,
        post,
        feed,
        setFeed
    } = context;

    // 2. Fetch feed with error handling
    const handleGetFeed = useCallback(async () => {
        setLoading(true);

        try {
            const data = await getFeed();

            setFeed(data.posts.reverse());
        } catch (error) {
            console.error(
                'Failed to fetch feed:',
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    }, [setLoading, setFeed]);


     const handleCreatePost = async(imageFile , caption)=>{
        setLoading(true)

        const data = await createPost(imageFile , caption)
        setFeed([data.post, ...feed]) //new post and purani sabhi posts
        
        setLoading(false)


    }

    const handleLike = async (post)=>{
        setLoading(true)//you can skip loading in like feature if u want
        const data = await likePost(post)
        await handleGetFeed()
        setLoading(false)


    }
    const handleUnLike = async (post)=>{
        setLoading(true)//you can skip loading in like feature if u want
        const data = await unLikePost(post)
        await handleGetFeed()
        
        setLoading(false)


    }




    useEffect(()=>{
        handleGetFeed()
    },[])

    return {
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnLike
    };
};


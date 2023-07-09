import {getDocs, collection} from 'firebase/firestore';
import { db } from '../Config/firebase';
import { useState, useEffect } from 'react';
import {Post} from '../Components/Home/Post';

export interface Post{
    id: string;
    userId: string;
    user: string;
    Title: string;
    description: string;
}


export const Home = () => {
    const postRef = collection(db, "posts");
    const [postsList, setPostsList] = useState<Post[] | null>(null);

    const getPosts = async() => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }

    useEffect(() =>{
        getPosts();
    },[]);

    return(
        <div>
            <h1>Home Page</h1>
            {postsList?.map((post) => (<Post post={post}/>))}
        </div>
    );
}
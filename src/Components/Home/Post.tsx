import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import {Post as IPost} from "../../Pages/Home";
import { db, auth } from "../../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import '../../App.css';

interface Props{
    post: IPost
}

interface Like{
    userId: string;
    likeId: string;
}

export const Post = ( props : Props) =>{
    const { post } = props;
    const [ user ] =useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);

    const likeRef = collection( db, "likes");

    const likesDoc = query( likeRef, where( "postId", "==", post.id))

    const getLikes = async() => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    const hashUserLikes = likes?.find((like) => (like.userId === user?.uid));

    const addLikes = async() =>{
        try{
            const newDoc = await addDoc(likeRef, {userId: user?.uid,postId: post?.id,});
            if(user){
            setLikes( (prev) => prev? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }] );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const removeLikes = async() =>{
        try{
            
            const likesToDeleteQuery = query( likeRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid));

            const likeToDeleteData = await getDocs(likesToDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id ;
            const likesToDelete = doc( db, "likes", likeId);

            await deleteDoc( likesToDelete );

            if(user){
            setLikes( (prev) =>  prev && prev.filter( (like) => like.likeId !== likeId ) );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect( () =>{
        getLikes();
    }, []);

    return (
        // parent div
        <div className="postBox">

            {/* child div 1 */}
            <div className="postImage">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiQVKG2QkEFXqWD3ihKbRJDkpwXc0tols706y7bM75EhFte6tv2aqkyOdar6tExQdnCs&usqp=CAU" 
                     alt="https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0="/>
            </div>

            {/* child div 2 */}
            <div className="postContent">

            <div className="title">
                <h1>{post.Title}</h1>
            </div>

            <div className="body">
                <p>{post.description}</p>
            </div>

            <div className="footer">
                
                <button onClick={hashUserLikes? removeLikes : addLikes}>{hashUserLikes? <>&#128078;</>:<>&#128077;</>}</button>
                <p>Likes: {likes?.length} 
                @{post.user}</p>
            </div>

            </div>
        </div>
    );
}
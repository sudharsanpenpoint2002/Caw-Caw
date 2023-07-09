import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import {db, auth} from "../../Config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormType {
    title: string;
    description: string;
}


export const CreateForm = () =>{

    const navigate = useNavigate();

    const [ user ] =useAuthState(auth)

    const postRef = collection( db, "posts");

    const schema = yup.object().shape({
        title: yup.string().required("You must fill title..."),
        description: yup.string().required("You must fill description..."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm <CreateFormType>({
        resolver: yupResolver(schema),
    });

    const createPost = async(data: CreateFormType) =>{
        await addDoc( postRef, {
            Title: data.title,
            description: data.description,
            user: user?.displayName,
            userId: user?.uid,
        });
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit(createPost)}>
            <input placeholder='title...' {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder='description...' {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type='submit' className="submitForm"/>
        </form>
    );
}
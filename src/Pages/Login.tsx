import { auth, provider} from '../Config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    const signInwithGoogle =  async() =>{
        const result = await signInWithPopup(auth,provider); // creates a pop-up to sign In with google
        console.log(result);
        navigate("/"); // automatically goes to the given url of our site
    }

    return(
        <div>
            <p>SignIn with Google to continue ...</p>
            <button onClick={signInwithGoogle}>Sign in with Google</button>
        </div>
    );
}
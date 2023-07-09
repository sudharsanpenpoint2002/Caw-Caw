import { Link } from 'react-router-dom';
import { auth } from '../Config/firebase'; // auth contains all info about the google account
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth'
export const Navbar = () =>{

    const [ user ] =useAuthState(auth); // it can automatically updates "user" tells about "loading" , "error"

    const signUserOut = async() =>{

        await signOut(auth);
    }

    return(
        <div className='navbar'>
            <div className='links'>
            <Link to= "/">Home</Link>
            {!user ? (<Link to= "/login">Login</Link>):(<Link to= "/createpost">Create Post</Link>)} 
            </div>
            <div className='user'> 
                {user && 
                <>
                {user?.displayName}<br/>
                <img src={user?.photoURL || ""} alt ="" width="35" height="35"/>
                </>
                }
            </div>
            <button onClick={signUserOut}>LogOut</button>
        </div>
    )
}
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import useUser from "../useUser";

const NavBar = () => {
    const {user, isloading} = useUser();
    const navigate = useNavigate();

  return (
    <nav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/articles'>Articles</Link>
            </li>
            {isloading ? <li>Loading...</li>
                :(<>
                    {user && (
                        <li style={{ color: 'white' }}>
                        Logged in as {user.email}
                        </li>
                    )}
                    <li>
                    {user 
                        ? <button onClick={() => signOut(getAuth())}>Signout</button>
                        :<button onClick={() => navigate('/login')}>SignIn </button>
                    } 
                    </li>
                </>)
            }

        </ul>
    </nav>
  )
}

export default NavBar
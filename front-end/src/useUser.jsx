import { useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const useUser = () => {
    // Tesll use whether or not Firebase Auth is currently loading users auth state
    const [isLoading, setIsLoading] = useState(true);

    // Track user session data
        const [user, setUser] = useState(null);

    useEffect(() => {
    // Checks if users auth has changed or if Firebase auth loads the users current auth state
    // prevent memory leaks by unsubscribing the user on logout or component unmounts
      const unsubscribe = onAuthStateChanged(getAuth(), function(user) {
        setUser(user);
        setIsLoading(false);
      })

      return unsubscribe;
    }, [])
    

  return {isLoading, user}
}

export default useUser;
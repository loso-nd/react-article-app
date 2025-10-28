import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function logInToAccount() {
    try {
      // send a request to Firebase auth to auth the user 
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <h1> Log In</h1>
      {error && <p>{error}</p>}
      <input 
        placeholder='Your email address'
        type='text'
        value={email}
        onChange={e => setEmail(e.target.value)} />
      <input 
        placeholder='Your password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)} />
      <button onClick={logInToAccount}>Login</button>
      <Link to='/create-account'>Don't have an account? Create one here!</Link>
    </>
  )
}

export default LoginPage
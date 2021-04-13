import './App.css';
import React, { useContext } from 'react';
import { Context } from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './pages/Chat';

function App() {
  const { auth, firebase } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const signOut = async () => {
    auth.signOut();
  };

  if (loading) {
    return <h1>LOADING ...</h1>;
  }
  if (error) {
    return <h1>{'error'}</h1>;
  }
  return (
    <div className="App">
      <div>
        {user ? (
          <>
            <button onClick={signOut} className="signout">sign out</button>
            
            <Chat />
          </>
        ) : (
          <button onClick={signIn}>login with google</button>
        )}
      </div>
    </div>
  );
}

export default App;

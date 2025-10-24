import { signInWithGoogle, signOutUser, useAuthState } from '../utilities/firebase';

const AuthButton = () => {
  const [user] = useAuthState();

  return user ? (
    <div>
      <span>Welcome, {user.displayName}</span>
      <button onClick={signOutUser}>Sign out</button>
    </div>
  ) : (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default AuthButton;

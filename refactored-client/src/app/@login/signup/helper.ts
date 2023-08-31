import { auth, googleAuthProvider } from '../../../firebase/firebaseApp';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { addUserToFirestore } from '../../../firebase/userController';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';


export const handleGoogleSignIn = (router:AppRouterInstance) => {
  signInWithRedirect(auth, googleAuthProvider);
} 


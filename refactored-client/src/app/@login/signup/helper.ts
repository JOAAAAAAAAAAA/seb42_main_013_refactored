import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { auth, googleAuthProvider } from '../../../../firebase/firebaseApp';

export const handleGoogleSignIn = (router:AppRouterInstance) => {
  signInWithRedirect(auth, googleAuthProvider);
} 


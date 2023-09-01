import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { auth, googleAuthProvider } from '../../../../firebase/firebaseApp';
import { addUserToFirestore } from '../../../../firebase/userController';

// export const handleGoogleSignIn = (router:AppRouterInstance) => {
//   signInWithPopup(auth, googleAuthProvider)
//   .then ((result) => {
//     const user = result?.user;
//     console.log("user",user)
//     addUserToFirestore (user) ;
//     router.push ("/");
//   })
//   .catch((error) => {
//     throw new Error (error. message);
//   });
// } 

export const handleGoogleSignIn = (router:AppRouterInstance) => {
  signInWithPopup(auth, googleAuthProvider)
  .then ((result) => {
    const user = result?.user;
    console.log("user",user)
    addUserToFirestore (user) ;
    router.push ("/");
  })
  .catch((error) => {
    throw new Error (error. message);
  });
} 
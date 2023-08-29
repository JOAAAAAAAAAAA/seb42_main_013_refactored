import Image from 'next/image'
import SignupForm from '../components/SignupForm';
import Link from 'next/link';
import { SignupButton } from '../components/Buttons';
import { auth, googleAuthProvider } from '../../../firebase/firebaseApp';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { addUserToFirestore } from '../../../firebase/userController';
import { useRouter } from 'next/router';

function Signup() {
  const router = useRouter();

  const googleSignin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = googleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        addUserToFirestore(user);
        router.push('/suggest');

        console.log(result);
      }).catch((error) => {
        console.error(error)
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = googleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="container flex flex-col w-full font-nanumGothic px-9 h-full items-center justify-center gap-8">
      <div className="flex items-center justify-center"><Image src="/images/icon--ipu.png" alt="I PILL U logo" width={40} height={40} /><p className="text-[40px] font-semibold tracking-wide ml-2.5">I Pill U</p></div>
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <div className="flex flex-col shrink-0 w-full gap-[4px]">
        <SignupButton oauthProvider='google' onClick={googleSignin}/>
        <SignupButton oauthProvider='github' />
        <SignupButton oauthProvider='facebook' />
        <SignupButton oauthProvider='kakao' />
      </div>
    </div>
  )
}

export default Signup;
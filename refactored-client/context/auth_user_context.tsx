// "user client"
// import { AuthUser} from "@/types";
// import { getRedirectResult } from "firebase/auth";
// import { createContext } from "react";



// interface AuthUserContextType {
//   authUser: AuthUser | null;
//   loading: boolean; 
//   signInWithGoogle: () => void;
//   signOut: () => void;
// }

// const AuthUserContext = createContext<AuthUserContextType>({
//   //초기값
//   authUser: null,
//   loading: true,
//   signInWithGoogle: async () => ({user: null, credential: null}),
//   signOut: () => {},
// });


// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// export function AuthProvider({children}:AuthProviderProps) {
//   const [authUser, setAuthUser] = useState<AuthUser | null>(null);

//   getRedirectResult(auth)
//   .then((result) => {
//     console.log("triggered")
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     // const credential = GoogleAuthProvider.credentialFromResult(result);
//     // const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result?.user;
//     const operationType = result?.operationType;
//     if(user){
//       addUserToFirestore(user);
//       router.push('/suggest');
//     }
//   }).catch((error) => {
//     console.error(error)
//     // Handle Errors here.
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     // const credential = googleAuthProvider.credentialFromError(error);
//     // ...
//   });


//   return(
//     <AuthUserContext.Provider value={}>
//       {children}
//     </AuthUserContext.Provider>
//   )
// }


//context 사용하면 server side rendering이 안됨
//보류
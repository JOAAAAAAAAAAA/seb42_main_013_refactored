import { User, getRedirectResult } from "firebase/auth";
import { auth, firestore } from "./firebaseApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";


export const addUserToFirestore = async (user: User) => {
  const userRef = doc(firestore, "users", user.uid);
  //doc parameter (reference to the document, path, pathSegments)
  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      lastLoginAt: serverTimestamp(),
    },
    { merge: true }
  )
  //setDoc parameter (reference to the document, data to write, SetOptions)
  //SetOptions parameter (merge: boolean, mergeFields: string[])
  //perform granular merges instead of overwriting the target documents in their entirety by providing a SetOptions with merge: true.
}
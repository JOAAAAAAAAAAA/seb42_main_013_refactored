import { NextResponse } from "next/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from "@/firebase/firebaseApp";
import { cookies, headers } from "next/headers";


export async function POST(req: Request) {
  const authorization = headers().get("Authorization");
  const { user } = await req.json()
  
  if(!user){
    // return new Response("no user found", {status: 404})
    return NextResponse.json({message: "no user found"}, {status: 404})
  }

  try {
    const userRef = doc(firestore, "users", user.uid);
    //doc parameter (reference to the document, path, pathSegments)
    await setDoc(
      //setDoc parameter (reference to the document, data to write, SetOptions)
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
      //SetOptions parameter (merge: boolean, mergeFields: string[])
      //perform granular merges instead of overwriting the target documents in their entirety by providing a SetOptions with merge: true.
      )
    return NextResponse.json({message: "user added"}, {status: 200})
  }catch (error) {
    console.error(error)
    return NextResponse.json({message: "error"}, {status: 500})
  }

}

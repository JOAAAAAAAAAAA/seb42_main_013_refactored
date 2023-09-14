
import { adminAuth } from "@/firebase/firebaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  console.log('logout req', req)
}

export const getSessionCookie = async (idToken:string, csrfToken:string, body?:any) => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/sessionlogin`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'csrfToken': csrfToken, ...body}),
  });
  return response;
}

export const signup = async (idToken:string, csrfToken:string, body?:any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/signup`, {
   method: "POST",
   headers: {
     "Authorization": `Bearer ${idToken}`,
     "Content-Type": "application/json",
   },
   body: JSON.stringify({'csrfToken': csrfToken, ...body}),
 });
 return response;
}
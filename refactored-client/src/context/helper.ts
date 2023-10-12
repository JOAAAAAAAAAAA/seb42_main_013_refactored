export const getSessionCookie = async (idToken:string, csrfToken:string, body?:any) => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/session`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'CSRF-Token': csrfToken, ...body}),
  });
  return response;
}
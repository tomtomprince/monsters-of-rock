 const authConfig = {
   providers: [
     {
       domain: process.env.NEXT_PUBLIC_CLERK_URL,
       applicationID: "convex",
     },
   ],
 };

export default authConfig;

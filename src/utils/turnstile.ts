export async function verifyTurnstileToken(turnstileToken: string){

  if(!turnstileToken) return false;

  try{

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const response = await fetch(url, {
  
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
  
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken
  
      })
  
    })
  
    const data = await response.json();
    return data.success === true;

  } catch (error) {

    console.error("Turnstile verification error:", error);
    return false;

  }

}
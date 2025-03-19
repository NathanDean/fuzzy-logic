import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {

  return (

    <form className = "flex flex-col items-center">

      <label htmlFor="email">Email:</label>
      <input className = "my-2 border-2 rounded-sm w-100" id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input className = "my-2 border-2 rounded-sm w-100" id="password" name="password" type="password" required />

      <button className = "my-2 border-2 rounded-sm w-100" formAction={login}>Log in</button>

      <Link href = "/signup">Don't have an account?  Sign up here.</Link>


    </form>

  )

}
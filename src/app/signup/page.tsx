import { signup } from "../login/actions";
import Link from "next/link";

export default function SignUpPage() {

  return (

    <form className = "flex flex-col items-center">

      <label htmlFor="email">Email:</label>
      <input className = "my-2 border-2 rounded-sm w-100" id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input className = "my-2 border-2 rounded-sm w-100" id="password" name="password" type="password" required />

      <button className = "my-2 border-2 rounded-sm w-100" formAction={signup}>Sign up</button>

      <Link href = "/login">Already have an account?  Log in here.</Link>

    </form>

  )

}
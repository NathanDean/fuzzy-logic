"use client"

import { useState } from "react";
import { subscribeToMailingList } from "@/app/actions/mailingList"

export default function MailingListForm (){

    const [subscribeMessage, setSubScribeMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const result = await subscribeToMailingList(formData);
        
        if (result?.error) {
            // Handle error
            setSubScribeMessage("Sorry, please try again.")

        } else {
            // Handle success
            setSubScribeMessage("Thank you for subscribing")

        }

    };
    
    return (

        <form onSubmit = {handleSubmit} className = "m-0 p-0 shadow-none text-sm">

            {subscribeMessage && <p>{subscribeMessage}</p>}
            <div className = "flex flex-col sm:flex-row items-center">
            <h3 className = "w-full">Subscribe to updates:</h3>
            <input className = "w-auto mx-2" id = "email" name = "email" type="email" placeholder = "Email" required />
            <button className = "btn btn-primary m-auto text-sm " type="submit">Subscribe</button>
            </div>

        </form>

    )

}
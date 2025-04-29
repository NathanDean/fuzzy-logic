import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { outfit } from "@/lib/fonts";

dayjs.extend(advancedFormat);

export default async function WorkshopDetails({params}: {params: Promise<{ workshopId: string }>}){

  const { workshopId } = await params;

  const supabase = await createClient();

  const { data: workshop, error } = await supabase
    .from("workshops")
    .select("*")
    .eq("id", workshopId)
    .single();

  if(error){

    return <div>Workshop not found</div>;

  }

  return (

    <div className = {`${outfit.className} flex flex-col h-full items-center justify-center`}>

        <div className = "w-1/4 bg-white rounded-2xl shadow-xl overflow-hidden">

            <img src = "/default-workshop-image.jpg" alt = "Workshop image" className = "w-full h-48 object-cover" />

            <div className = "flex flex-col items-center justify-center p-6">
                
                <h1 className = "text-2xl font-medium">{workshop.class_name}</h1>
                <h2 className = "py-2 text-xl">{dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")}</h2>
                <h2 className = "pb-2 text-xl">{workshop.venue}</h2>

                <p className = "pb-2">{workshop.description}</p>

                <button className = {`${outfit.className} w-full sm:w-1/2 mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all`} >Book now</button>

            </div>

        </div>

    </div>

  )

}
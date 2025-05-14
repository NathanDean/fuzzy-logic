import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

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

    <div className = "flex flex-col h-full items-center justify-center">

        <div className = "w-1/4 bg-white rounded-2xl shadow-xl overflow-hidden">

            <img src = "/default-workshop-image.jpg" alt = "Workshop image" className = "w-full h-48 object-cover" />

            <div className = "flex flex-col items-center justify-center p-6">
                
                <h1>{workshop.class_name}</h1>
                <h2>{dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")}</h2>
                <h2>{workshop.venue}</h2>

                <p className = "pb-2">{workshop.description}</p>

                <button className = "btn btn-primary" >Book now</button>

            </div>

        </div>

    </div>

  )

}
import Image from "next/image"
import Card from "./Card"

interface Person {

    id: number,
    created_at: string,
    image_url: string,
    name: string,
    bio: string
  
}

export default function PersonCard({ person }: { person: Person }){

    return (

        <Card key = {person.id}>

            {/* Image */}
            <Image src = "/default-team-member-image.jpg" width = "100" height = "100" alt = {`${person.name}`} className = "w-full h-75 object-cover" />

            <div className = "p-6">
                
                {/* Name */}
                <h2 className = "pb-1">{person.name}</h2>

                {/* Bio */}
                <p className = "py-1">{person.bio}</p>

            </div>

        </Card>

    )

}
import Card from "./Card"
import CardImage from "./CardImage"

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
            <CardImage 
                src = "default-team-member-image.jpg" 
                alt = {person.name}
                height = "lg"
             />

            <div className = "p-6">
                
                {/* Name */}
                <h2 className = "pb-1">{person.name}</h2>

                {/* Bio */}
                <p className = "py-1">{person.bio}</p>

            </div>

        </Card>

    )

}
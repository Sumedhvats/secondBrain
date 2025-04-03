import { CardComponent } from "./cardComponent"

export const Hero=()=>{
    return(
        <div className="flex flex-wrap gap-4 ">
        <CardComponent
        title="First card"
        type="tweet"
        tags={["productivity", "tweet"]}
        date="12/02/12"
        link="https://x.com/adxtya_jha/status/1907413445542400117"
        />
      <CardComponent
        title="Second card"
        type="video"
        tags={["productivity", "youtube"]}
        date="12/02/12"
        link="https://www.youtube.com/watch?v=0n4YX11CaOk"
        />
        </div>
    )
}
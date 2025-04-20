
import VideoCard from "../components/VideoCard";
import { cards } from "@/Constants/Constants";


export default function Home() {

  return (
    <div
      className="grid w-full xl:max-w-[1300px] p-1
      lg:grid-cols-3 md:grid-cols-2 gap-2 2xl:grid-cols-4 
      "
    >
      {cards?.map((card) => {
        return <VideoCard key={card.data._id} card={card.data} />;
      })}
    </div>
  );
}

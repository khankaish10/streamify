

import VideoCard from "../components/VideoCard";
import { cards } from "@/Constants/Constants";


function Home() {

  return (

    <div
      className="grid gap-2 w-full p-1 ml-0 mt-10
      sm:grid-cols-2 sm:ml-[50px]
      lg:grid-cols-3 lg:ml-[200px] 
      xl:max-w-[1600px]  
      "
    >
      {cards?.map((card) => {
        return <VideoCard key={card.data._id} card={card.data} />;
      })}
    </div>
  );
}

export default Home;

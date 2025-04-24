

import VideoCard from "../components/VideoCard";
import { cards } from "@/Constants/Constants";


function Home() {

  return (

    <div
      className="grid gap-2 w-full p-1
      sm:grid-cols-2 
      lg:grid-cols-3
      2xl:grid-cols-4 xl:max-w-[1300px] 
      "
    >
      {cards?.map((card) => {
        return <VideoCard key={card.data._id} card={card.data} />;
      })}
    </div>
//  lg:grid-cols-3 md:grid-cols-2 gap-2 2xl:grid-cols-4 2xl:gap-2
  );
}

export default Home;

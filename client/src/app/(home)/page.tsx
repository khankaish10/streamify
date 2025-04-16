import Image from "next/image";
import VideoCard from "../components/VideoCard";

export default function Home() {
  return (
    <div
      className="grid w-full
      lg:grid-cols-3 md:grid-cols-2 gap-2 md:place-items-center
      "
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((video) => {
        return <VideoCard key={video} />;
      })}
    </div>
  );
}

// lg:max-w-[90%] md:max-w-[95%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
// gap-4 sm:gap-6 place-items-center border-1 border-red-500
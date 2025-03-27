import Image from "next/image";
import VideoCard from "../components/VideoCard";

export default function Home() {
  return (
    <main
      // className="md:max-w-[60%]  m-auto
      //               sm:max-w-[95%]
      //               border-1 border-red-500
      //               md:justify-between items-center
      //               flex flex-col sm:flex-wrap gap-4 sm:gap-6
      //               md:flex-row "
      className="lg:max-w-[80%] md:max-w-[85%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
      gap-4 sm:gap-6 place-items-center"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((video) => {
        return <VideoCard key={video} />;
      })}
    </main>
  );
}

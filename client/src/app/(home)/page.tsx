import Image from "next/image";
import VideoCard from "../components/VideoCard";

export default function Home() {
  return (
    <div
      className="grid w-full xl:max-w-[1300px] p-1
      lg:grid-cols-3 md:grid-cols-2 gap-2 2xl:grid-cols-4 md:place-items-center
      "
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8,9,
      10,11,12,13,14,15,16,17,18,19].map((video) => {
        return <VideoCard key={video} />;
      })}
    </div>
  );
}

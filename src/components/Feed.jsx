import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";
import VideoCard from "./VideoCard";

const Feed = ({ toggleNav }) => {
  var { categoryId } = useParams();
  const [videos, setVideos] = useState(null);

  const options = {
    method: "GET",
    url: `https://youtube138.p.rapidapi.com/search/?q=${
      !categoryId ? "new" : categoryId
    }`,
    params: { hl: "en", gl: "US" },
    headers: {
      "X-RapidAPI-Key": "3bac6ae4f2msh563b268c2a4f0ffp159e7cjsnee46a82cb913",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setVideos(res.data.contents);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [categoryId]);

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNavbar toggleNav={toggleNav} />
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-5'>
          {videos?.map((item) => {
            if (item.type == "video")
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;

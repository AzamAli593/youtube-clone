import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { useParams } from "react-router-dom";
import axios from "axios";
import SuggestedVideoCard from "./SuggestedVideoCard";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";

const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState(null);

  const options = {
    params: { id: `${id}`, hl: "en", gl: "US" },
    headers: {
      "X-RapidAPI-Key": "0ca54f29e5mshfdb1005f7763d54p132969jsne1e4ae2ef245",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    axios
      .get("https://youtube138.p.rapidapi.com/video/details/", options)
      .then((res) => setVideo(res.data));
    axios
      .get("https://youtube138.p.rapidapi.com/video/related-contents/", options)
      .then((res) => setRelatedVideos(res.data));
    axios
      .get("https://youtube138.p.rapidapi.com/video/comments/", options)
      .then((res) => {
        console.log(res.data.comments);
        setComments(res.data.comments);
      });
  }, [id]);

  return (
    <div className='flex justify-center flex-row h-[calc(100%-56px)] bg-black'>
      <div className='w-full max-w-[1280px] flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto'>
          <div className='h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width='100%'
              height='100%'
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className='text-white font-bold text-sm md:text-xl mt-4 line-clamp-2'>
            {video?.title}
          </div>
          <div className='flex justify-between flex-col md:flex-row mt-4'>
            <div className='flex'>
              <div className='flex items-start'>
                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                  <img
                    className='h-full w-full object-cover'
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className='flex flex-col ml-3'>
                <div className='text-white text-md font-semibold flex items-center'>
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1' />
                  )}
                </div>
                <div className='text-white/[0.7] text-sm'>
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
              <div className='bg-white px-4 font-semibold py-1 flex justify-center items-center rounded-3xl ml-3'>
                <span>Subscribe</span>
              </div>
            </div>
            <div className='flex text-white mt-4 md:mt-0 text-sm md:text-md font-semibold md:text-basic'>
              <div className='flex items-center justify-center h-11 px-6 py-3 rounded-3xl bg-white/[0.15]'>
                <AiOutlineLike className='text-xl text-white mr-2' />
                {`${abbreviateNumber(video?.stats?.views, 2)}`}
                <div className='h-full border-l-2 mx-2 md:mx-4 '></div>
                <BiDislike className='text-xl text-white' />
              </div>
              <div className='flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4'>
                <RiShareForwardLine className='text-2xl mr-2' /> Share
              </div>
            </div>
          </div>
          <div className='bg-[#383838]/[0.7] w-full text-white my-4 rounded-lg px-4 py-2 flex'>
            {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
            <span className='truncate ml-2'>{video?.publishedTimeText}</span>
          </div>
        </div>
        <div className='flex flex-col py-6 px-4 overflow-y-auto scrollbar-hide lg:w-[350px] xl:w-[400px]'>
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestedVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;

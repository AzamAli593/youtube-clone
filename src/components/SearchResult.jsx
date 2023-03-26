import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = ({ toggleNav }) => {
  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");

  const options = {
    method: "GET",
    url: `https://youtube138.p.rapidapi.com/search/`,
    params: { q: `${query}`, hl: "en", gl: "US" },
    headers: {
      "X-RapidAPI-Key": "0ca54f29e5mshfdb1005f7763d54p132969jsne1e4ae2ef245",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setResult(res.data.contents);
        console.log(res);
      })
      .catch((error) => console.log(error.resposne.data.message));
  }, [query]);

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNavbar toggleNav={toggleNav} />
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black'>
        <div className='grid grid-cols-1 gap-2 p-5'>
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video;
            return <SearchResultVideoCard key={video.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

"use client";
import { useEffect, useState, useRef } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import YouTubeEmbed from './YouTubeEmbed';

export default function FacebookEmbed({url}:any) {

  const ytList = [
    { 
      videoId:'VVEqFKfrQlM', 
      title:'เครื่องดันสายไฟ และอุปกรณ์ช่วยติดตั้งสายไฟ Power Ball & Cable installation Tools | RENT',
    },
    { 
      videoId:'CXm2OgRQuyg',
      title:'Rent(泰国)公司, 建筑工程机械设备租赁“一条龙”服务 ! | RENT'
    },
    { 
      videoId:'cBfKkdvspM8',
      title:'Mini-crawler Crane / Spider crane UNIC UR-W295C | RENT'
    },
    { 
      videoId:'HGhu38wmROI',
      title:'Air Lifter ลิฟต์ยกของแรงดันลม AGE56-12 Sanyo Kiki | RENT'
    },
    { 
      videoId:'OYm0J2-HGnk',
      title:'Auto chisel A300 Nitto Kohki | RENT'
    },
  ];
  const [screenWidth, setScreenWidth] = useState<number>(375);
  const [listHeight, setListHeight] = useState<number>(429);
  const fbRef = useRef(null);
  useEffect(() => {
    const adjust = () => {
      if (fbRef.current)  setScreenWidth((fbRef.current as Element).clientWidth);
      let youtubeContent = document.getElementById("youtube-content");
      let title = youtubeContent?.querySelector("h3")?.clientHeight || 16;
      let preview =
        youtubeContent?.querySelector(".video-responsive")?.clientHeight || 311;
      let calc = Number(800 - (title + preview + 76));
      setListHeight(calc);
    };
    adjust();
    window.addEventListener("orientationchange", adjust);
    window.addEventListener('resize', adjust);

    if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    } else {
      const interval = setInterval(() => {
        if ((window as any).FB) {
          clearInterval(interval);
          (window as any).FB.XFBML.parse();
        }
      }, 1000);
    }
    return () => {
      window.removeEventListener('orientationchange', adjust);
      window.removeEventListener('resize', adjust);
    };
  }, []);

  return <>
    <div className="bg-gradient-to-r bg-slate-50 rounded-xl p-4 social-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
            <div className="col-span-6" id="facebook-content" ref={fbRef}>
                <h3 className="font-bold text-2xl mb-4">
                    <div className="flex">
                        <span className="bg-blue-500 rounded-lg p-1">
                            <FaFacebookF className="text-slate-100"/>
                        </span>
                        <span className="ml-1">Facebook</span>
                    </div>
                </h3>
                <div className="rounded-lg overflow-hidden iframe-content">
                    <div 
                        className="fb-page" 
                        data-href={url}
                        data-width={`${screenWidth}`}
                        data-height="700"
                        data-tabs="timeline"
                        data-show-facepile="true"
                    ></div>
                </div>
            </div>
            <div className="col-span-6" id="youtube-content">
                <h3 className="font-bold text-2xl mb-4">
                    <div className="flex">
                        <span className="bg-red rounded-lg py-2 pl-3 pr-2 flex items-center text-center">
                        <FaPlay className="text-white text-sm"/>
                        </span>
                        <span className="ml-1">Youtube</span>
                    </div>
                </h3>
                <div>
                    <YouTubeEmbed list={ytList} width={screenWidth>= 780 ?`100%`:screenWidth-20} height={listHeight}/>
                </div>
            </div>
        </div>
    </div>
  </>;
}
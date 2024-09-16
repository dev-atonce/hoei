"use client";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";



export default function CoverSwiper({ banner }: any) {
  return (
    <div className="header-slider">
      <div className="w-full header-cover">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={true}
          loop={true}
          speed={1200}
          // navigation
          // pagination={{ type: "bullets", clickable: true }}
          effect="fade"
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          <ul>
            {banner.map((v: any, i: any) => {
              return (
                <SwiperSlide key={`${i}`} className="ralative ">
                  <Link href={i?.link ? i?.link : "/"}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${v?.image}`}
                      // src={v?.image}
                      // src={`/img/banner1.png`}
                      alt={v.imageAlt}
                      width={1920}
                      height={618}
                      className=" object-cover  w-full aspect-[16/6]"
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </ul>
        </Swiper>
      </div>
    </div>
  );
}

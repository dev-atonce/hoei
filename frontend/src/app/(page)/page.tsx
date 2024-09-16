import Loading from "@/components/main/Loading/Loading";
import CoverSwiper from "@/components/main/Cover/CoverSwiper";
import About from "@/components/main/Home/About";
import TrainingBanner from "@/components/main/Home/TrainingBanner";

import Blog from "@/components/main/Home/Blog";
import Contact from "@/components/main/Home/Contact";
import Client from "@/components/main/Home/Client";
import Service from "@/components/main/Home/Service";

const fetchService = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/service/`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.rows;
};
const fetchClient = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/client/`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.rows;
};
const fetchBanner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/banner`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.rows;
};
const fetchAbout = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/about-us/home`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};
export default async function Home() {
  const service = await fetchService();
  const banner = await fetchBanner();
  const client = await fetchClient();
  const about = await fetchAbout();

  return (
    <>
      <Loading />
      {/* cover */}
      {/* @ts-ignore */}
      <CoverSwiper banner={banner} />
      <div className="container mx-auto">
        {/* About Us */}
        <About content={about?.aboutUsTH} />
        {/* Service */}
        <Service data={service} />
      </div>
      {/* About Us 2 */}
      <Contact />
      <div className="container mx-auto">
        {/*Customer*/}
        <Client data={client} />

        {/* Blog */}
        <Blog />
      </div>
    </>
  );
}

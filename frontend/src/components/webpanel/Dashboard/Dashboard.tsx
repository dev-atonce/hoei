"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import { FaHome, FaPeopleArrows, FaShippingFast } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoMdImages } from "react-icons/io";
import { SlEnvolope } from "react-icons/sl";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { LogInContext } from "@/contexts/LogInContext";

const Dashboard: React.FC = () => {
  const { onCheckAuth, user }: any = useContext(LogInContext);

  useEffect(() => {
    onCheckAuth();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Home" link="/webpanel/home">
          <FaHome size={20} />
        </CardDataStats>
        <CardDataStats title="About Us" link="/webpanel/about-us">
          <ImProfile size={20} />
        </CardDataStats>
        <CardDataStats title="Banner" link="/webpanel/cover">
          <IoMdImages size={20} />
        </CardDataStats>
        <CardDataStats title="Client" link="/webpanel/client">
          <FaPeopleArrows size={20} />
        </CardDataStats>
        <CardDataStats title="Service" link="/webpanel/service">
          <FaShippingFast size={20} />
        </CardDataStats>
        <CardDataStats title="Contact Form" link="/webpanel/contact-form">
          <SlEnvolope size={20} />
        </CardDataStats>
        <CardDataStats title="Contact List" link="/webpanel/contact-list">
          <RiContactsBook2Fill size={20} />
        </CardDataStats>
        {user?.role !== "user" && (
          <>
            <CardDataStats title="Seo Optimize" link="/webpanel/settings/seo">
              <IoSettings size={20} />
            </CardDataStats>
            <CardDataStats title="User" link="/webpanel/settings/user">
              <FaUserGear size={20} />
            </CardDataStats>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

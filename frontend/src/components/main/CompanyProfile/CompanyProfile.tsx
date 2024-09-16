"use client";

import { Logo } from "@/components/main/Logo/Logo";
import { GoOrganization } from "react-icons/go";
import { BsPersonFill, BsPinMap } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { FaCalendarDays, FaPeopleGroup } from "react-icons/fa6";
import { HiMiniWallet } from "react-icons/hi2";
import { LuGoal } from "react-icons/lu";

export default function CompanyProfile({ lng }: any) {
  return (
    <>
      <div className="bg-slate-50/20 from-blue-100 rounded-xl mt-4 p-10 md:p-20 text-slate-500">
        <div className="w-full flex justify-center pb-20">
          <Logo color="#002B7F" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1 border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <GoOrganization size={20} />
              ชื่อบริษัท
            </div>
            <div className="col-span-5 md:col-span-4">
              <h1 className="font-semibold">บริษัท เร้นท์ (ประเทศไทย) จำกัด</h1>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <FaCalendarDays size={20} />
              วันที่ก่อตั้งบริษัท
            </div>
            <div className="col-span-5 md:col-span-4">
              วันที่ 8 กุมภาพันธ์ พ.ศ. 2551
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <TbReportMoney size={20} />
              ทุนจดทะเบียนชำระแล้ว
            </div>
            <div className="col-span-5 md:col-span-4">420 ล้านบาท</div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <BsPinMap size={20} />
              ที่อยู่ของบริษัท
            </div>
            <div className="col-span-5 md:col-span-4">
              <ol className="decimal">
                <li>
                  <p>สำนักงานใหญ่</p>
                  เลขที่ 9/222-224, UM Tower, ถนนรามคำแหง, แขวงสวนหลวง,
                  เขตสวนหลวง, กรุงเทพฯ 10250
                </li>
                <li>
                  <p>สาขารังสิต</p>
                  59/4 หมู่ 11 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120
                </li>
                <li>
                  <p>สาขาสมุทรปราการ</p>
                  42/9 ถนนกิ่งแก้ว หมู่ที่ 3 ต.ราชาเทวะ อ.บางพลี จ.สมุทรปราการ
                  10540
                </li>
                <li>
                  <p>สาขาชลบุรี</p>
                  เลขที่ 233 หมู่ 3 ถนนสุขุมวิท ต.คลองตำหรุ อ.เมืองชลบุรี
                  จ.ชลบุรี 20000
                </li>
                <li>
                  <p>สาขาบ่อวิน</p>
                  276/844 หมู่ที่ 3 ตำบลบ่อวิน อำเภอศรีราชา จังหวัดชลบุรี 20230
                </li>
                <li>
                  <p>สาขามาบตาพุด</p>
                  99/99 ถนนทางหลวงหมายเลข 363 ตำบลมาบตาพุด อำเภอเมืองระยอง
                  จังหวัดระยอง 21150
                </li>
                <li>
                  <p>สาขาสมุทรสาคร</p>
                  12/8 หมู่ 4 ตำบลนาดี อำเภอเมือง จังหวัดสมุทรสาคร 74000
                </li>
              </ol>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <LuGoal size={20} />
              จุดมุ่งหมายของบริษัท
            </div>
            <div className="col-span-5 md:col-span-4">
              ประกอบธุรกิจให้บริการเช่ารถ เครื่องจักร
              และอุปกรณ์ทางด้านงานอุตสาหกรรม งานก่อสร้าง
              งานติดตั้งเครื่องจักรประเภทต่างๆ　อาทิ รถขุด รถบด
              รถกระเช้าที่ใช้ในที่สูง, รถยก, เครื่องอัดลม, เครื่องปั่นไฟ,
              อุปกรณ์ช่วยในการยก ตู้แอร์เคลื่อนที่ และอื่นๆอีกมากมาย
              ให้แก่ลูกค้าทั่วไปในประเทศไทย
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <FaPeopleGroup size={20} />
              รายชื่อกรรมการบริษัท
            </div>
            <div className="col-span-5 md:col-span-4">
              <ol className="decimal">
                <li>นายชิเกะยูกิ ทามูระ</li>
                <li>นายอากิระ โอกาดะ </li>
                <li>นายคาซึฮิสะ โอกาดะ</li>
                <li>นางมัลลิกา ชารินสา</li>
                <li>นายกิตติพงษ์ เศรษฐเวคิน</li>
                <li>นางสาวรสลิน จรรยาศักดิ์</li>
              </ol>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 grid-rows-1   border border-slate-400 px-4 py-6 rounded-lg shadow-md">
            <div className="font-bold flex items-center gap-2 md:col-span-2 md:border-r border-slate-300">
              <HiMiniWallet size={20} />
              รายชื่อผู้ถือหุ้น
            </div>
            <div className="col-span-5 md:col-span-4">
              <ol className="decimal">
                <li>เร้นท์ คอร์ปอเรชั่น ประเทศญี่ปุ่น 49%</li>
                <li>
                  <p>Rent Trade & Service Co.,Ltd. 48%</p>
                  (บริษัทเทรดดิ้ง
                  ให้บริการพนักงานควบคุมเครื่องจักรและงานขนส่งในไทย
                  ซึ่งอยู่ในเครือบริษัทของเร้นท์ฯ ประเทศญี่ปุ่น)
                </li>
                <li>
                  <p>บริษัท เมว่าเอนเตอร์ไพรซ์ (ประเทศไทย) จำกัด 3%</p>
                  (บริษัทไทยตัวแทนจำหน่ายเครื่องอัดลม แอร์คอมเพรสเซอร์
                  &quot;โคเบลโก้&quot;)
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

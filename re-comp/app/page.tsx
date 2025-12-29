'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./components/button";
import HotKey from "./components/hotKey";
import Dropdown from "./components/dropdown";


//icons
import timeAndSales from "../public/deliverables/dt/table/table_menu/time_and_sales.svg";
import Buy from "../public/deliverables/dt/table/table_menu/buy.svg";
import Sell from "../public/deliverables/dt/table/table_menu/sell.svg";
import WitchList from "../public/deliverables/dt/tab_menu/watch_list/watch_list.svg";
import DarkModeIcon from "../public/deliverables/web_application/settings_options/dark_mode.svg";
import LightModeIcon from "../public/deliverables/web_application/settings_options/light_mode.svg";

export default function HomePage() {

  //hooks
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [isDarkMode]);

  return (
    <main className="m-2 flex gap-5">
      <div className="m-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Buttons</h1>
        <Button
          text="Buy"
          fontSize="12px"
          width="88px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#0C8544"
          hoverBgColor="green"
          onClick={() => alert("Bought!")}
        />

        <Button
          text="Sell"
          fontSize="12px"
          width="88px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#ED0A4F"
          hoverBgColor="red"
          onClick={() => alert("Sold!")}
        />

        <Button
          text="Reset"
          fontSize="12px"
          width="220px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#E4E4E4"
          textColor="black"
          onClick={() => alert("Reset clicked!")}
        />
      </div>

      <div className="m-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dropdown</h1>
        <Dropdown
          label="Options"
          icon=""
          bgColor="#DBEBFF"
          itemBg="#DBEBFF"
          fontSize="12px"
          width="220px"
          height="38px"
          items={[
            { asif: '1', zaman: 'Time & Sales', icon: <Image src={timeAndSales} alt="t&s" width={12} height={12} /> },
            { asif: '2', zaman: 'Buy', icon: <Image src={Buy} alt="buy" width={12} height={12} /> },
            { asif: '3', zaman: 'Sell', icon: <Image src={Sell} alt="sell" width={12} height={12} /> },
          ]}
          itemKey="asif"
          itemLabel="zaman"
          onSelect={(it) => alert(`Selected: ${it.asif} ${it.zaman}`)}
        />

        <Dropdown
          label="Options"
          icon=""
          bgColor="transparent"
          itemBg="transparent"
          fontSize="12px"
          width="220px"
          height="38px"
          items={[
            { asif: '1', zaman: 'Time & Sales', icon: <Image src={timeAndSales} alt="t&s" width={12} height={12} /> },
            { asif: '2', zaman: 'Buy', icon: <Image src={Buy} alt="buy" width={12} height={12} /> },
            { asif: '3', zaman: 'Sell', icon: <Image src={Sell} alt="sell" width={12} height={12} /> },
          ]}
          itemKey="asif"
          itemLabel="zaman"
          onSelect={(it) => alert(`Selected: ${it.asif} ${it.zaman}`)}
        />

        <Dropdown
          label="Favorite List"
          icon={<Image src={WitchList} alt="time and sales" width={12} height={12} />}
          bgColor="#DBEBFF"
          itemBg="#DBEBFF"
          fontSize="12px"
          width="220px"
          height="38px"
          items={[
            { asif: '1', zaman: 'Time & Sales', icon: <Image src={timeAndSales} alt="t&s" width={12} height={12} /> },
            { asif: '2', zaman: 'Buy', icon: <Image src={Buy} alt="buy" width={12} height={12} /> },
            { asif: '3', zaman: 'Sell', icon: <Image src={Sell} alt="sell" width={12} height={12} /> },
          ]}
          itemKey="asif"
          itemLabel="zaman"
          onSelect={(it) => alert(`Selected: ${it.asif} ${it.zaman}`)}
        />

        <Dropdown
          label="Favorite List"
          icon={<Image src={WitchList} alt="time and sales" width={12} height={12} />}
          bgColor="transparent"
          itemBg="transparent"
          fontSize="12px"
          width="220px"
          height="38px"
          items={[
            { asif: '1', zaman: 'Time & Sales', icon: <Image src={timeAndSales} alt="t&s" width={12} height={12} /> },
            { asif: '2', zaman: 'Buy', icon: <Image src={Buy} alt="buy" width={12} height={12} /> },
            { asif: '3', zaman: 'Sell', icon: <Image src={Sell} alt="sell" width={12} height={12} /> },
          ]}
          itemKey="asif"
          itemLabel="zaman"
          onSelect={(it) => alert(`Selected: ${it.asif} ${it.zaman}`)}
        />
      </div>
      <div className="m-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Buttons</h1>
        <Button
          text="Buy"
          fontSize="12px"
          width="192px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#0C8544"
          hoverBgColor="green"
          onClick={() => alert("Bought!")}
        />

        <Button
          text="Sell"
          fontSize="12px"
          width="192px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#ED0A4F"
          hoverBgColor="red"
          onClick={() => alert("Sold!")}
        />

        <Button
          text="Reset"
          fontSize="12px"
          width="120px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#E4E4E4"
          textColor="black"
          onClick={() => alert("Reset clicked!")}
        />

        <Button
          icon={
            <Image src={isDarkMode ? LightModeIcon : DarkModeIcon} alt="mode" width={20} height={20} />
          }
          iconPosition="left"
          width="36px"
          height="36px"
          padding="0px"
          alignment="center"
          borderRadius="6px"
          bgColor="#FFFFFF"
          onClick={() =>
            setIsDarkMode(!isDarkMode)
          }
        />


      </div>

      <div className="m-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hot keys</h1>


        <HotKey
          icon={<Image src={Buy} alt="time and sales" width={12} height={12} />}
          primaryText="Buy"
          secondaryText="Alt+B"
          keys={['Alt', 'B']}
          onClick={() => alert('Stock bought')}
        />
        <HotKey
          icon={<Image src={Buy} alt="time and sales" width={12} height={12} />}
          bgColor="transparent"
          primaryText="Buy"
          secondaryText="Alt+B"
          keys={['Alt', 'B']}
          onClick={() => alert('Stock bought')}
        />
        <HotKey
          icon={<Image src={timeAndSales} alt="time and sales" width={12} height={12} />}
          primaryText="Time and sales"
          secondaryText="F2"
          keys={['F2']}
          onClick={() => alert('Time and sales clicked')}
        />
        <HotKey
          icon={<Image src={timeAndSales} alt="time and sales" width={12} height={12} />}
          bgColor="transparent"
          primaryText="Time and sales"
          secondaryText="F2"
          keys={['F2']}
          onClick={() => alert('Time and sales clicked')}
        />

        <HotKey
          icon={<Image src={Sell} alt="time and sales" width={12} height={12} />}
          primaryText="Sell"
          secondaryText="Alt+S"
          keys={['Alt', 'S']}
          onClick={() => alert('Stock sold')}
        />
        <HotKey
          icon={<Image src={Sell} alt="time and sales" width={12} height={12} />}
          primaryText="Sell"
          bgColor="transparent"
          secondaryText="Alt+S"
          keys={['Alt', 'S']}
          onClick={() => alert('Stock sold')}
        />



      </div>



    </main>
  );
}
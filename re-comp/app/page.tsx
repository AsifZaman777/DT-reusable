'use client';
import Image from "next/image";
import Button from "./components/button";
import HotKey from "./components/hotKey";


//icons
import timeAndSales from "../public/deliverables/dt/table/table_menu/time_and_sales.svg";

export default function HomePage() {
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
          width="120px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#E4E4E4"
          textColor="black"
          onClick={() => alert("Reset clicked!")}
        />
      </div>


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
          width="120px"
          height="24px"
          alignment="center"
          borderRadius="5px"
          bgColor="#E4E4E4"
          textColor="black"
          onClick={() => alert("Reset clicked!")}
        />
      </div>

      <div className="m-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hot keys</h1>
        <HotKey
          primaryText="Time and sales"
          secondaryText="F2"
        />

        <HotKey
          icon={<Image src={timeAndSales} alt="time and sales" width={16} height={16} />}
          primaryText="Time and sales"
          secondaryText="F2"
        />

      </div>



    </main>
  );
}
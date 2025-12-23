'use client';
import Button from "./components/button";


export default function HomePage() {
  return (
    <main>
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
    </main>
  );
}
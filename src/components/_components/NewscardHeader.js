import Image from "next/image";

const NewscardHeader = () => {
  return (
    <>
      <div className="relative w-full h-[100px] mx-auto">
        <Image
          src="/assets/ungran_insider_img.png"
          alt="ungranInsider"
          fill
          className="rounded-t-lg"
        />
      </div>
      <div>
        {/* First row */}
        <div className="text-[25px] font-light text-red-700 tracking-tight transform scale-x-90">
          AUS DEM LEBEN | VON DER COMMUNITY
        </div>

        {/* Second row */}
        <div className="text-[25px] font-light text-[#436f4d] tracking-tight transform scale-x-90">
          NACHRICHTEN | KULTUR | KOCHREZEPTE
        </div>
      </div>
    </>
  );
};

export default NewscardHeader;

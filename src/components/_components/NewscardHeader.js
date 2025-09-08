import Image from "next/image"

const NewscardHeader=()=>{
    return(
        <>
        <div className="relative w-full h-[100px] mx-auto">
          <Image
            src="/assets/ungran_insider_img.png"
            alt="ungranInsider"
            fill
            className="rounded-t-lg"
          />
        </div>
        </>
    )
}

export default NewscardHeader
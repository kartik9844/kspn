import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button as BsButton } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import 'tailwindcss/tailwind.css'

const Homenav = () => {
    const router = useRouter()
  return (
    <div className="7self-stretch overflow-y-auto flex flex-col md:flex-row md:items-center items-start justify-start text-left text-base text-dwhite font-popins">
      <div className="relative bg-white w-[1550px] h-[80px]">
      <BsButton
         className="relative top-[calc(50%_-_20px)] left-[calc(47%_+_515.54px)] cursor-pointer hover:bg-[#5680E9] focus:bg-[#84CEEB] active:bg-[#5AB9EA] text-black"
          variant="outline-primary"
          onClick={() => router.push('./RTO/rtologin')}
        >
          RTO LOGIN
        </BsButton>
        <BsButton
          className="absolute top-[calc(50%_-_20px)] left-[calc(49%_+_612.09px)] cursor-pointer hover:bg-[#5680E9] focus:bg-[#84CEEB] active:bg-[#5AB9EA] text-black"
          variant="outline-primary"
          onClick={() => router.push('./keonics/klogin')}
        >
          KEONICS LOGIN
        </BsButton>
        <BsButton
          className="absolute w-[calc(100%_-_1410px)] top-[17.4px] right-[196.84px] left-[102.16px] cursor-pointer hover:bg-[#5680E9] focus:bg-[#84CEEB] active:bg-[#5AB9EA] text-black"
          variant="outline-primary"
          onClick={() => router.push('./certificate/cform')}
        >
          CERTIFICATE
        </BsButton>
        <BsButton
          className="absolute w-[calc(100%_-_1410px)] top-[17.4px] right-[11.53px] left-[232.47px] cursor-pointer hover:bg-[#5680E9] focus:bg-[#84CEEB] active:bg-[#5AB9EA] text-black"
          variant="outline-primary"
          onClick={() => router.push('./licence/lform')}
        >
         LICENSES
        </BsButton>
      </div>

    </div>
  );
};

export default Homenav;
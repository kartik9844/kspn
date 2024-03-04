import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";


const Homebody = () => {
  return (
    <div className="self-stretch bg-dwhite overflow-hidden flex flex-row items-center justify-center text-left text-31xl text-darkslategray-100 font-popins">
      <div className="flex-1 overflow-hidden flex flex-row py-14 pr-[155.7999725341797px] pl-[155.8000030517578px] items-center justify-center">
        <div className="w-[400px] h-[510px] flex flex-col items-start justify-start gap-[19px] max-w-[2018px]">
          <div className="w-[400px] flex flex-row items-start justify-start">
            <h1 className="m-0 relative text-inherit tracking-[-2px] leading-[35px] font-normal font-popins inline-block max-w-[800px]">
              <p>{`Blockchain based driving license and course completion certificate generation and validation system`}</p>
            </h1>
          </div>
          <div className="w-[420px] h-[510px]  flex-row items-start justify-start text-xs text-gray">
            <h2 className="m-0 relative text-inherit tracking-[-0.5px] leading-[34px] font-normal font-popins inline-block max-w-[401px]">
              <p className="m-0 text-lg">{`The blockchain-based solution on the Polygon network revolutionizes online certification and licensing processes. With distinct portals for the RTO and KIONCS, users can seamlessly generate and validate licenses and certificates. Leveraging Polygon's blockchain ensures a secure environment, minimizing fraud risks and enhancing trust. This system addresses the pressing need for streamlined and secure certification procedures. Its user-friendly interface and blockchain technology pave the way for a future of digital governance focused on transparency and efficiency.`}</p>
            </h2>
          </div>
          
        </div>
      </div>
      <img
        className="relative w-[711.6px] h-[400px] m-14 overflow-hidden shrink-0 object-cover"
        alt=""
        src="blockchain.jpg"
      />
    </div>
  );
};

export default Homebody;



import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";


const Homebody = () => {
  return (
    <div className="self-stretch bg-dwhite overflow-hidden flex flex-row items-center justify-center text-left text-31xl text-darkslategray-100 font-popins">
      <div className="flex-1 overflow-hidden flex flex-row py-14 pr-[155.7999725341797px] pl-[155.8000030517578px] items-center justify-center">
        <div className="w-[500px] h-[380px] flex flex-col items-start justify-start gap-[25px] max-w-[2018px]">
          <div className="w-[400px] flex flex-row items-start justify-start">
            <h1 className="m-0 relative text-inherit tracking-[-3px] leading-[35px] font-normal font-popins inline-block max-w-[850px]">
              <p>{`Blockchain based driving license and course completion certificate generation and validation system`}</p>
            </h1>
          </div>
          <div className="w-[400px] flex flex-row items-start justify-start text-5xl text-gray">
            <h2 className="m-0 relative text-inherit tracking-[-0.4px] leading-[35px] font-normal font-popins inline-block max-w-[401px]">
              <p className="m-0">{`
The blockchain-based Certification System on Polygon transforms governmental licensing. With separate portals for RTO and KIONCS, it streamlines license and certificate handling. Using blockchain's security, it guarantees authenticity, enhancing trust. This system simplifies online certification, paving the way for transparent digital governance.`}</p>
            </h2>
          </div>
          <div className="flex flex-row items-center justify-center gap-[15px]">
            <Button
              className="cursor-pointer"
              variant="outline-primary"
            //   onClick={onDivframer14dfk51Click}
            >
              Get Started
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline-primary"
            //   onClick={onDivframer1soagorClick}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <img
        className="relative w-[711.6px] h-[400px] m-14 overflow-hidden shrink-0 object-cover"
        alt=""
        src="/f4z9junbeullvmi8q0nh3kuxkf8jpg@2x.png"
      />
    </div>
  );
};

export default Homebody;

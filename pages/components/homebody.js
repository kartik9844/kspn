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
          <div className="w-[400px] flex flex-row items-start justify-start text-5xl text-gray">
            <h2 className="m-0 relative text-inherit tracking-[-0.5px] leading-[34px] font-normal font-popins inline-block max-w-[401px]">
              <p className="m-0">{`An all-encompassing lab, in collaboration with IESA,Government of Karnataka, DST, and Nidhi PRAYAS, empowering mechatronics innovators with top notch facilities, skill development,and expert guidance for seamlessidea and expert guidance for seamless idea-to-prototype realization`}</p>
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

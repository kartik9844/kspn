import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useContract, useContractRead } from "@thirdweb-dev/react"

function LicenseHashPage() {
  const router = useRouter()
  const { licenseHash } = router.query // get the licenseHash from query params

  const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E")

  const { data, isLoading } = useContractRead(contract, "getLicenseByHash", [licenseHash])

  const [parsedData, setParsedData] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setParsedData(data)
      setIsDataLoaded(true);
    }
  }, [data])
  if (isLoading || !Array.isArray(parsedData) || parsedData.length === 0) {
    return <div className="bg-black p-12 antialiased">Loading data...</div>;
  }
//   console.log(typeof parsedData[0]); 
//   console.log("serilno",parsedData[0]);
//   console.log(typeof parsedData[1]); 
//   console.log("Name",parsedData[1]);
//   console.log(typeof parsedData[2]); 
//   console.log("FatherName",parsedData[2]);
//   console.log(typeof parsedData[3]); 
//   console.log("Dob",parsedData[3]);
//   console.log(typeof parsedData[4]);
//   console.log("validDate",parsedData[4]);
//   console.log(typeof parsedData[5]); 
//   console.log("DLno",parsedData[5]);
//   console.log(typeof parsedData[6]); 
//   console.log("CVM",parsedData[6]);
//   console.log(typeof parsedData[7]); 
//   console.log("Address",parsedData[7]);
//   console.log(typeof parsedData[8]); 
//   console.log("phonenumber",parsedData[8]);
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 0.001);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    console.log(formattedDate);
    return formattedDate;
  }
  const dobBigNum = parsedData[3]; 
  const validBigNum = parsedData[4];
  const dobTimestamp = Number(dobBigNum) * 1000;
  const validTimestamp = Number(validBigNum) * 1000;
  const DOB = formatDate(dobTimestamp);
  console.log(DOB, "DOB");
  const ValidDate = formatDate(validTimestamp);
  console.log(ValidDate,"Validation Date")
  const serilno = parsedData[0];
  const Name = parsedData[1];
  const FatherName = parsedData[2];
  const DLno = parsedData[5];
  const Cov = parsedData[6];
  const Address = parsedData[7];
  const phonenumber = parsedData[8];
  console.log(serilno,"serilno")
  console.log(Name,"Name")
  console.log(FatherName,"FatherName")
  console.log(DLno,"DLno")
  console.log(Cov,"Cov")
  console.log(Address,"Address") 
  console.log(phonenumber,"phonenumber")
//   const docData = {
//     serilno: parsedData[0],
//     Name: parsedData[1],
//     FatherName: parsedData[2],
//     Dob: DOB,
//     validDate: ValidDate,
//     DLno: parsedData[5],
//     Cov: parsedData[6],
//     Address: parsedData[7],
//     phonenumber: parsedData[8],
//  }; 
// console.log(docData);

  

  return (
    <div className="bg-gray-100 p-12 antialiased" key={serilno}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-gray-300 p-8 rounded-lg">
      <div className="flex justify-between">
        <div>
          <span className="text-lg font-semibold">Serial No: {serilno}</span>
        </div>
        <div>
          <span className="text-lg font-semibold">DL No: {DLno}</span>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-lg font-semibold">Full Name: {Name}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">Father Name: {FatherName}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">DOB: {DOB}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">Valid Date: {ValidDate}</span>
      </div>
      <div className="mt-4">
        <span className="text-lg font-semibold">Cov: {Cov}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">Address: {Address}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold">Phone Number: {phonenumber}</span>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseHashPage
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { resolveMethod,getContract } from "thirdweb";
    import { useReadContract } from "thirdweb/react";
    import { client } from "../_app";
    import { polygonAmoy } from "thirdweb/chains";
function LicenseIdPage() {
  const router = useRouter()
  const { licenseId } = router.query
  const contract = getContract({ 
    client, 
    chain: polygonAmoy, 
    address: "0x932b65a249d87448d687a8242bB6452344A476dD"
  });
  const { data, isLoading } = useReadContract({ 
    contract, 
    method: resolveMethod("getLicenseById"), 
    params: [licenseId] 
  });
  const [parsedData, setParsedData] = useState([]);
  const [serilno, setSerilno] = useState(null);
  const [Name, setName] = useState(null);
  const [FatherName, setFatherName] = useState(null);
  const [Dob, setDob] = useState(null);
  const [Validdate, setValidDate] = useState(null);
  const [DLno, setDLno] = useState(null);
  const [Cov, setCov] = useState(null);
  const [Address, setAddress] = useState(null);
  const [phonenumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (data) {
      setParsedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (parsedData.length > 0) {
      const formatDate = (timestamp) => {
        const date = new Date(timestamp * 0.001);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        // console.log(formattedDate);
        return formattedDate;
      }

      const dobTimestamp = Number(parsedData[3]) * 1000;
      const validTimestamp = Number(parsedData[4]) * 1000;
      const DOB = formatDate(dobTimestamp);
  // console.log(DOB, "DOB");
      const ValidDate = formatDate(validTimestamp);
  // console.log(ValidDate,"Validation Date")
  const serilnoValue = Number(parseInt(parsedData[0], 16))
  setSerilno(serilnoValue)
  console.log(serilnoValue);
      setName(parsedData[1]);
      setFatherName(parsedData[2]);
      setDob(DOB);
      setValidDate(ValidDate);
      setDLno(parsedData[5]);
      setCov(parsedData[6]);
      setAddress(parsedData[7]);
      setPhoneNumber(parsedData[8]);
    }
  }, [parsedData]);

  if (isLoading || parsedData.length === 0) {
    return <div className="bg-gray-100 p-12 antialiased">Loading data...</div>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">License Details</h2>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="space-y-4">
          <div>
            <div className="text-gray-700">Serial Number:</div>
            <div className="text-gray-800">{serilno}</div>
          </div>
          <div>
            <div className="text-gray-700">Name:</div>
            <div className="text-gray-800">{Name}</div>
          </div>
          <div>
            <div className="text-gray-700">Father's Name:</div>
            <div className="text-gray-800">{FatherName}</div>
          </div>
          <div>
            <div className="text-gray-700">Date of Birth:</div>
            <div className="text-gray-800">{Dob}</div>
          </div>
          <div>
            <div className="text-gray-700">Valid Date:</div>
            <div className="text-gray-800">{Validdate}</div>
          </div>
          <div>
            <div className="text-gray-700">Driving License Number:</div>
            <div className="text-gray-800">{DLno}</div>
          </div>
          <div>
            <div className="text-gray-700">Cov:</div>
            <div className="text-gray-800">{Cov}</div>
          </div>
          <div>
            <div className="text-gray-700">Address:</div>
            <div className="text-gray-800">{Address}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-gray-700">Phone Number:</div>
            <div className="text-gray-800">{phonenumber}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LicenseIdPage
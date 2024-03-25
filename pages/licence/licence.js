import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useContract, useContractRead } from "@thirdweb-dev/react"

function LicenseHashPage() {
  const router = useRouter()
  const { licenseHash } = router.query // get the licenseHash from query params

  const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E")

  const { data, isLoading } = useContractRead(contract, "getLicenseByHash", [licenseHash])

  const [parsedData, setParsedData] = useState([])

  useEffect(() => {
    if (data) {
      setParsedData(data)
    }
  }, [data])
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
  const docData = {
    serilno: parsedData[0],
    Name: parsedData[1],
    FatherName: parsedData[2],
    Dob: DOB,
    validDate: ValidDate,
    DLno: parsedData[5],
    Cov: parsedData[6],
    Address: parsedData[7],
    phonenumber: parsedData[8],
 }; 


  if (isLoading || parsedData.length === 0) {
    return <div>Loading data...</div>
  }

  return (
    <div className="bg-black text-white">
      <div>
        <h1>Found License with ID: {licenseHash}</h1>
        <h1>Serilno: {DOB}</h1>
        <h1>Full Name: {DOB}</h1>
        <h1>DOB: {DOB}</h1>
        <h1>validDate: {DOB}</h1>
        <h1>DLno: {DOB}</h1>
        <h1>Cov: {DOB}</h1>
        <h1>Address: {DOB}</h1>
        <h1>phonenumber: {DOB}</h1>
        <h1>hash: {licenseHash}</h1>
        
                  
    
      </div>
    </div>
  )
}

export default LicenseHashPage
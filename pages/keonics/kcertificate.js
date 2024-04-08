import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { resolveMethod } from "thirdweb";
    import { useReadContract } from "thirdweb/react";
    import { contract,client } from "../_app";

function kcertifcate() {
  const router = useRouter()
  const { certificateId } = router.query
  const { data, isLoading } = useReadContract({ 
    contract, 
    method: resolveMethod("getCertificateById"), 
    params: [certificateId] 
  });

  const [parsedData, setParsedData] = useState([]);
  const [serilno, setSerilno] = useState(null);
  const [Name, setName] = useState(null);
  const [cc, setcc] = useState(null);
  const [form, setform] = useState(null);
  const [to, setto] = useState(null);
  const [sc, setsc] = useState(null);
  const [grade, setgrade] = useState(null);
 

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

      const formTimestamp = Number(parsedData[4]) * 1000;
      const toTimestamp = Number(parsedData[5]) * 1000;
      const FORM = formatDate(formTimestamp);
  // console.log(DOB, "DOB");
      const TO = formatDate(toTimestamp);
  // console.log(ValidDate,"Validation Date")
  const serilnoValue = Number(parseInt(parsedData[0], 16))
  setSerilno(serilnoValue)
  console.log(serilnoValue);
      setName(parsedData[1]);
      setcc(parsedData[2]);
      setsc(parsedData[3]);
      setform(FORM);
      setto(TO);  
      setgrade(parsedData[6]);
    }
  }, [parsedData]);

  if (isLoading || parsedData.length === 0) {
    return <div className="bg-gray-100 p-12 antialiased">Loading data...</div>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">certificate Details</h2>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="space-y-4">
          <div>
            <div className="text-gray-700">certificate Number:</div>
            <div className="text-gray-800">{serilno}</div>
          </div>
          <div>
            <div className="text-gray-700">Full Name:</div>
            <div className="text-gray-800">{Name}</div>
          </div>
          <div>
            <div className="text-gray-700">Course Completed:</div>
            <div className="text-gray-800">{cc}</div>
          </div>
          <div>
            <div className="text-gray-700">Study center:</div>
            <div className="text-gray-800">{sc}</div>
          </div>
          <div>
            <div className="text-gray-700">Form Date:</div>
            <div className="text-gray-800">{form}</div>
          </div>
          <div>
            <div className="text-gray-700">To Date:</div>
            <div className="text-gray-800">{to}</div>
          </div>
          
        </div>
        <div className="space-y-4">
        <div>
            <div className="text-gray-700">Obtained Grade:</div>
            <div className="text-gray-800">{grade}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default kcertifcate
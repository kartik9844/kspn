import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useContract, useContractRead } from "@thirdweb-dev/react"

function LicenseHashPage() {
  const router = useRouter()
  const { licenseHash } = router.query
  const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E")
  const { data, isLoading } = useContractRead(contract, "getLicenseByHash", [licenseHash])
  console.log("data: ", data)
  // State and setter for parsedData
  const [parsedData, setParsedData] = useState(null)

  // Use useEffect to update parsedData when data changes
  useEffect(() => {
    if (data) {
      setParsedData(data)
      console.log("updated parsedData: ", parsedData);
    }
  }, [data]) 

  // Conditional rendering
  if (isLoading || !parsedData) {
    return <div>Loading data...</div>
  }
  console.log("rendered parsedData: ", parsedData);
  return (
    <div className="bg-black text-white">
      <h1>Found License with ID: {licenseHash}</h1>
      <div>
      <h2>Serial ID: {parsedData?.serialId}</h2>
        <h2>Driver Name: {parsedData?.fullname}</h2>
        <h2>Father Name: {parsedData?.Fathername}</h2>
        <h2>
          Date of Birth: {new Date(parsedData?.dobTimestamp?.toNumber() || 0).toLocaleDateString()}
        </h2>
        <h2>
          License Validation: {new Date(parsedData?.validateTimestamp?.toNumber() || 0).toLocaleDateString()}
        </h2>
        <h2>Driving License Number: {parsedData?.dlNo}</h2>
        <h2>Coverage: {parsedData?.cov}</h2>
        <h2>Address: {parsedData?.address}</h2>
        <h2>Phone Number: {parsedData?.phone}</h2>
      </div>
    </div>
  )
}

export default LicenseHashPage
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useContract, useContractRead } from "@thirdweb-dev/react"

function LicenseHashPage() {
  const router = useRouter();
  const { licenseHash } = router.query;
  const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E");
  const { data, isLoading } = useContractRead(contract, "getLicenseByHash", [licenseHash]);

  // State and setter for parsedData
  const [parsedData, setParsedData] = useState([]);

  // Use useEffect to update parsedData when data changes
  useEffect(() => {
    if (data) {
      setParsedData(data);
    }
  }, [data]);

  // Conditional rendering
  if (isLoading || parsedData.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="bg-black text-white">
      <h1>Found License with ID: {licenseHash}</h1>
      <div>
        {parsedData.map((item, index) => {
          switch (typeof item) {
            case "string":
              return <h2 key={index}>{item}</h2>;
            case "number":
            case "bigint":
              return <h2 key={index}>{item.toString()}</h2>;
            case "object":
              if (item._isBigNumber) {
                return <h2 key={index}>{item.toString()}</h2>;
              }
              if (Array.isArray(item)) {
                return (
                  <div key={index}>
                    {item.map((el, idx) => (
                      <h2 key={idx}>
                        <React.Fragment>
                          {idx === 0 && "0: "}
                          <React.Fragment>{el.toString()}</React.Fragment>
                        </React.Fragment>
                      </h2>
                    ))}
                  </div>
                );
              }

              if (parsedData[2] * 1000) {
                // Date of Birth
                return <h2 key={`Dob_${index}`}>Date of Birth: {new Date(parsedData[2] * 1000).toLocaleDateString()}</h2>;
              }

              if (parsedData[3] * 1000) {
                // License Validation
                return <h2 key={`Validate_${index}`}>
                    License Validation: {new Date(parsedData[3] * 1000).toLocaleDateString()}
                  </h2>;
              }

              return <h2 key={index}>{JSON.stringify(item)}</h2>;
            default:
              return <h2 key={index}>Unknown data type: {typeof item}</h2>;
          }
        })}
      </div>
    </div>
  );
}

export default LicenseHashPage;
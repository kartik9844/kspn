import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { contract,client } from "../_app";
export default function Ctable() {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("listCertificates"),
    params: []
  });
  console.log(data);
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const [serialNumbers, fullNames, hashes] = data;
  console.log(serialNumbers)
  
  return (
    <table className="table-auto w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-200 text-gray-700">Serial No</th>
          <th className="px-4 py-2 bg-gray-200 text-gray-700">Full Name</th>
          <th className="px-4 py-2 bg-gray-200 text-gray-700">Hash</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border px-4 py-2 bg-gray-100 text-gray-800">{index}</td>
            <td className="border px-4 py-2 bg-gray-100 text-gray-800">{fullNames[index]}</td>
            <td className="border px-4 py-2 bg-gray-100 text-gray-800">{hashes[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
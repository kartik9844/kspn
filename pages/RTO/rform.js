
import Link from 'next/link'
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { prepareContractCall, resolveMethod,getContract } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { contract1,client } from "../_app";
import { ConnectButton } from "thirdweb/react";
import { createWallet, embeddedWallet } from "thirdweb/wallets";
import { polygonAmoy } from "thirdweb/chains";
export default function Rform() {
  const contract = getContract({ 
    client, 
    chain: polygonAmoy, 
    address: "0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E"
  });
  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
  const [serialId, setSerialId] = useState(0);
  const [Licence, setLicence] = useState({
    LicenceId: '',
    fullname: '',
    Fathername: '',
    Dob: '',
    ValidateDate: '',
    dlNo: '',
    cov: '',
    phone: '',
    address: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'dlNo') {
      // Convert value to string
      updatedValue = String(value);
    }
    setLicence((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateValidation = () => {
    const dob = new Date(Licence.Dob);
    const validateDate = new Date(Licence.ValidateDate);
    const diffInYears = (validateDate - dob) / (1000 * 60 * 60 * 24 * 365);
  
    if (diffInYears < 23) {
      return false;
    }
    return true;
  };
  const handleDLNoValidation = () => {
    const dlNo = Licence.dlNo;
    const regex = /^(KA\d{2}[A-Z]{2}\d{4}|KA\d{2}[A-Z]\d{5})$/;
    return regex.test(dlNo);
  };
  const covOptions = [
    "select one",
    "LMV (Light Motor Vehicle)",
    "LMV-NT (Light Motor Vehicle - Non-Transport)",
    "LMV-TR (Light Motor Vehicle - Transport)",
    "MCWG (Motorcycle Without Gear)",
    "MCWOG (Motorcycle With Gear)",
    "HGMV (Heavy Goods Motor Vehicle)",
    "HPMV (Heavy Passenger Motor Vehicle)",
    "HPMV-TR (Heavy Passenger Motor Vehicle - Transport)",
    "MGV (Motorized Goods Vehicle)",
    "HPMV-L (Heavy Passenger Motor Vehicle - Light)",
    "HPMV-T (Heavy Passenger Motor Vehicle - Tractor)"
  ];
  const handlePhoneValidation = () => {
    const phone = Licence.phone;
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleDateValidation()) {
      alert("Validate Date should be at least 23 years greater than DOB.");
      return;
    }
  
    if (!handleDLNoValidation()) {
      alert("DL No should be in the format KA25HH2658 or KA25C5659.");
      return;
    }
  
    if (!handlePhoneValidation()) {
      alert("Phone number should be a 10-digit number.");
      return;
    }
    // Convert Dob and ValidateDate to timestamps
    const dobTimestamp = new Date(Licence.Dob).getTime();
    console.log('dob:',dobTimestamp);
    const validateTimestamp = new Date(Licence.ValidateDate).getTime();
    setSerialId((prevSerialId) => prevSerialId + 1);
    const call = async () => {
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("createLicense"),
        params: [
          Licence.LicenceId,
          Licence.fullname,
          Licence.Fathername,
          dobTimestamp,
          validateTimestamp,
          Licence.dlNo.toString(),
          Licence.cov,
          Licence.address,
          Licence.phone,
        ],
      });
      sendTransaction(transaction)
.then(async (result) => {
    const { transactionHash } = result;
    console.log("Transaction hash:", transactionHash);
    setIsSuccess(true);
    setLicence({
      LicenceId: '',
      fullname: '',
      Fathername: '',
      Dob: '',
      ValidateDate: '',
      dlNo: '',
      cov: '',
      phone: '',
      address: '',
    });
  })
.catch((error) => {
    console.error("Error sending transaction:", error);
  });
  

    // Wait for the transaction to be mined
    await result.wait();
    console.log("Transaction mined!");
    };
    // const call = async () => {
    //   try {
    //     const data = await createLicense({ 
    //       args: [
    //         serialId,
    //         Licence.fullname,
    //         Licence.Fathername,
    //         dobTimestamp,
    //         validateTimestamp,
    //         Licence.dlNo.toString(),
    //         Licence.cov,
    //         Licence.address,
    //         Licence.phone
    //       ] 
    //       });
    //     console.info("contract call successs", data);
    //   } catch (err) {
    //     console.error("contract call failure", err);
    //   }
    // }
    

    call();

    const docData = {
      LicenceId: Licence.LicenceId,
      fullname: Licence.fullname,
      Fathername: Licence.Fathername,
      Dob: dobTimestamp,
      ValidateDate: validateTimestamp,
      dlNo: Licence.dlNo,
      cov: Licence.cov,
      phone: Licence.phone,
      address: Licence.address,
    };

    console.log(docData);
  }

  const wallets =[
    embeddedWallet(),
    createWallet("io.metamask"),
      ];

  

    return (
        <div className="flex bg-white">
            <div className="flex flex-col p-4 bg-slate-400 shadow w-80 ">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-black"><Link href="Rdashboard">Dashboard</Link></h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <a
                                    href="listlicence"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"

                                        />
                                    </svg>
                                    <span>List Licences</span>
                                </a>
                            </li>
                            <li className="rounded-sm underline">
                                <a
                                    href="rform"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span>Generate Licence</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="rverify"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"
                                        />
                                    </svg>
                                    <span>verify</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="/"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>
                            <li>
                            <ConnectButton client={client} wallets={wallets} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

      <div>
      

          <form className="relative left-[450px]" onSubmit={handleSubmit}>
      <div className="space-y-10">
        <div className=" border-b border-gray-900/10 pb-12 ">
          <div className="mt-10 grid grid-cols-1 gap-x-11 gap-y-11 sm:grid-cols-6">
          <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
               LicenceId
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="LicenceId"
                    id="LicenceId"
                    value={Licence.LicenceId}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter seril number"
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Full Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Your FullName"
                    value={Licence.fullname}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Father Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="Fathername"
                    id="Fathername"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Your Father Name"
                    value={Licence.Fathername}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                DOB
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="Dob"
                    id="Dob"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter DOB"
                    value={Licence.Dob}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
               Validate Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="ValidateDate"
                    id="ValidateDate"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter name"
                    value={Licence.ValidateDate}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
            <div className="relative w-[516px] h-[70px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
              DL no
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="dlNo"
                    id="dlNo"
                    autoComplete="modelno"
                    className="block flex-1 border-0 py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Dlno number"
                    value={Licence.dlNo}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                COV
              </label>
              <div className="mt-2">
                <div className="flex rounded-md text-black shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select name="cov" id="cov" value={Licence.cov} onChange={handleInputChange}  required>
  {covOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Phone number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Phone number"
                    value={Licence.phone}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                ADDRESS
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Your Address"
                    value={Licence.address}
                    onChange={handleInputChange}
            required
                  />
                </div>
              </div>
            </div>

         
          
            
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          </div>
          
        </div>

      </div>

      {/* <div className="mt-6 flex items-center justify-end gap-x-6"> */}
       
        <button
          type="submit"
          className="relative top-[-250px] left-[130px] w-[226px] h-[50px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SUBMIT
        </button>
      {/* </div> */}
    </form>
     
    </div>
        </div>
    );
}
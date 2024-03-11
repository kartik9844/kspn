
import Link from 'next/link'
import React, { useState } from 'react';
import { useStateContext } from '@/context';
import { Button } from "react-bootstrap";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
export default function Rform() {
  
    const {connect,certifate,address,contract}=useStateContext();
    // const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E");
  const { mutateAsync: createLicense, isLoading } = useContractWrite(contract, "createLicense")
  const [serialId, setSerialId] = useState(0);

  const [Licence, setLicence] = useState({
    fullname: '',
    Fathername: '',
    Dob: '',
    ValidateDate: '',
    dlNo: '',
    cov: '',
    phone: '',
    address: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert Dob and ValidateDate to timestamps
    const dobTimestamp = new Date(Licence.Dob).getTime();
    const validateTimestamp = new Date(Licence.ValidateDate).getTime();
    setSerialId((prevSerialId) => prevSerialId + 1);
    const call = async () => {
      try {
        const data = await createLicense({ 
          args: [
            serialId,
            Licence.fullname,
            Licence.Fathername,
            dobTimestamp,
            validateTimestamp,
            Licence.dlNo.toString(),
            Licence.cov,
            Licence.address,
            Licence.phone
          ] 
          });
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }
    // Handle form submission logic
    // const call = async () => {
    //   try {
    //     const data = await createLicense({
    //       args: [
    //         Licence.fullname,
    //         dobTimestamp,
    //         Licence.dlNo.toString(), // Convert to string explicitly
    //         validateTimestamp,
    //         Licence.Fathername,
    //         Licence.address
    //       ]
    //     });
    //     console.info("contract call successs", data);
    //   } catch (err) {
    //     console.error("contract call failure", err);
    //   }
    // }

    call();

    const docData = {
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
                                    href="#"
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
                            <li className="rounded-sm">
                            <Button variant="dark"className="relative top-2 -left-2 h-[30px]  w-[250px] bg-black" onClick={() => connect()}>Connect</Button>
                            </li>
                            <li>
                              <p>{address}</p>
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
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="cov"
                    id="cov"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter COV Details"
                    value={Licence.cov}
                    onChange={handleInputChange}
            required
                  />
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
            <div className="container mx-auto mt-12">

            </div>
        </div>
    );
}
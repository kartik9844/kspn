import Link from 'next/link';
import React, { useState } from 'react';
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { contract,client } from "../_app";
import { ConnectButton } from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
import { createWallet, embeddedWallet } from "thirdweb/wallets";

export default function Kform() {
    // console.log(contract)
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
    const [serialId, setSerialId] = useState(0);
    const [Licence, setLicence] = useState({
        sid: "",
        fullname: '',
        CourseCompleted: '',
        Studycenter: '',
        FormDate: '',
        ToDate: '',
        grade: '',
    });
    const wallets = [
      embeddedWallet(),
      createWallet("io.metamask"),
    ];
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLicence((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const FromTimestamp = new Date(Licence.FormDate).getTime();
        const ToTimestamp = new Date(Licence.ToDate).getTime();
        setSerialId((prevSerialId) => prevSerialId + 1);

        try {
            const transaction = await prepareContractCall({
                contract,
                method: resolveMethod("createCertificate"),
                params: [
                    Licence.sid,
                    Licence.fullname,
                    Licence.CourseCompleted,
                    Licence.Studycenter,
                    FromTimestamp,
                    ToTimestamp,
                    Licence.grade
                ]
            });
            const { transactionHash } = await sendTransaction(transaction);
            console.log("Transaction hash:", transactionHash);
            setLicence({
             sid: "",
             fullname: '',
             CourseCompleted: '',
             Studycenter: '',
             FormDate: '',
             ToDate: '',
             grade: '',
            });
            const docData = {
                sid : Licence.sid,
                fullname: Licence.fullname,
                CourseCompleted: Licence.CourseCompleted,
                Studycenter: Licence.Studycenter,
                FromTimestamp,
                ToTimestamp,
                grade: Licence.grade,
            };

            console.log("Document data:", docData);
        } catch (error) {
            console.error("Error submitting transaction:", error);
            // Handle error (e.g., display error message to the user)
        }
    };

    return (
        <div className="flex bg-white">
            <div className="flex flex-col h-screen p-3 bg-slate-400 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-black"><Link href="kdashboard">Dashboard</Link></h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm underline">
                                <a
                                    href="listcertificate"
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
                                    <span>List Certifate</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="kform"
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
                                    <span>genrate certifate</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="kverify"
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
            <form className="relative left-[450px]" onSubmit={handleSubmit}>
      <div className="space-y-10">
        <div className=" border-b border-gray-900/10 pb-12 ">
          <div className="mt-10 grid grid-cols-1 gap-x-11 gap-y-11 sm:grid-cols-6">
          <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
               serial number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="sid"
                    id="sid"
                    value={Licence.sid}
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
                    value={Licence.fullname}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter name"
            required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Courses Completed
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="CourseCompleted"
                    id="CourseCompleted"
                    value={Licence.CourseCompleted}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter name"
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Study Centre
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="Studycenter"
                    id="Studycenter"
                    value={Licence.Studycenter}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter name"
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
               From Date 
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="FormDate"
                    id="FormDate"
                    value={Licence.FormDate}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            required
                  />
                </div>
              </div>
            </div>
            <div className="relative w-[516px] h-[70px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                To Date
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="ToDate"
                    id="ToDate"
                    value={Licence.ToDate}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter model number"
            required
                  />
                </div>
              </div>
            </div>
            <div className=" relative top-[15px] w-[516px] h-[120px] sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-10 text-black ">
                Obtained Grade
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="grade"
                    id="grade"
                    value={Licence.grade}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter grade"
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
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          </div>
          
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       
        <button
          type="submit"
          className="relative top-[-300px] left-[-500px] w-[226px] h-[50px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SUBMIT
        </button>
      </div>
    </form>
        </div>
    );
}

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
function isValidHash(hash) {
  return /^0x[0-9a-fA-F]{64}$/.test(hash);
}

function validateHash(hash) {
  return isValidHash(hash);
}

export default function rverify() {
  const router = useRouter()
  const [licenseId, setLicenseId] = useState("");
  const [licenseHash, setLicenseHash] = useState('');
  const [hashValidationMessage, setHashValidationMessage] = useState('');

  function handleLicenseHashBlur() {
    if (!validateHash(licenseHash)) {
      setHashValidationMessage('Invalid hash. Please enter a valid hash starting with "0x" and having 64 hexadecimal characters.');
    }
  }
  const handleLicenseIdSubmit = (event) => {
    event.preventDefault() // prevent form submission from triggering a refresh or navigation
    if (licenseId) {
      router.push(`/RTO/rlicence?licenseId=${licenseId}`)
    }
  }
  const handleLicenseHashSubmit = (event) => {
    event.preventDefault()
    if (validateHash(licenseHash)) {
      router.push(`/RTO/rhashl?licenseHash=${licenseHash}`)
    }
  }

  // const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E");
  // const { data, isLoading } = useContractRead(contract, "getLicenseById", [licenseId || 0])
  // console.log(data);
  return (
    <div className="flex bg-white">
    <div className="flex flex-col h-screen p-3 bg-slate-400 shadow w-60">
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
                            <span>List licences</span>
                        </a>
                    </li>
                    <li className="rounded-sm">
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
                            <span>genrate licence</span>
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
                </ul>
            </div>
        </div>
    </div>
    <div className="container mx-auto mt-12">
    <div className=" bg-white flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Search Using Hash Code
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLicenseHashSubmit} action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                HASH
              </label>
              <div className="mt-2">
              <input
            id="licenseHash"
            name="licenseHash"
            type="text"
            autoComplete="given-name"
            value={licenseHash}
            onChange={(e) => setLicenseHash(e.target.value)}
            onBlur={handleLicenseHashBlur}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
{
  hashValidationMessage && (
    <div className="mt-2 text-red-600">
      <p>{hashValidationMessage}</p>
    </div>
  )
}
              </div>
            </div>

            <div>
            </div>

            <div>
            <button
          type="submit"
          disabled={!validateHash(licenseHash)}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SEARCH
        </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" bg-white flex max-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Search Using ID 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLicenseIdSubmit} action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                ID
              </label>
              <div className="mt-2">
                <input
                  id="licenseId"
                  name="licenseId"
                  type="text"
                  pattern="[0-9]*"
                  title="Please enter only numbers"
                  value={licenseId}
                  onChange={(event) => setLicenseId(event.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
  )
}


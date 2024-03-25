import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from 'react';
import { useRouter } from 'next/router'

function isValidHash(hash) {
  return /^0x[0-9a-fA-F]{64}$/.test(hash);
}

function validateHash(hash) {
  return isValidHash(hash);
}

export default function iform() {
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
      router.push(`/licence/Lid?licenseId=${licenseId}`)
    }
  }
  const handleLicenseHashSubmit = (event) => {
    event.preventDefault()
    if (validateHash(licenseHash)) {
      router.push(`/licence/Licence?licenseHash=${licenseHash}`)
    }
  }

  // const { contract } = useContract("0x42B456a1879A0349DA9dAd632D2cF2B98AB48c5E");
  // const { data, isLoading } = useContractRead(contract, "getLicenseById", [licenseId || 0])
  // console.log(data);
  return (
    <>
      <div className=" bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

    </>
  )
}


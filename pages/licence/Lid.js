import { useRouter } from 'next/router'

function LicenseIdPage() {
  const router = useRouter()
  const { licenseId } = router.query

  console.log('License id:', licenseId)
  // Use the `licenseId` here to fetch the necessary data and display the page content
  return (
    <>
      <h1 className='bg-black'>Found License with ID: {licenseId}</h1>
    </>
  )
}

export default LicenseIdPage
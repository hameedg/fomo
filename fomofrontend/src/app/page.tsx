import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
    <Link href="/stocks" className='underline text-blue-600'>
        Navigate to Stocks
    </Link>
  </div>
  )
}

export default page
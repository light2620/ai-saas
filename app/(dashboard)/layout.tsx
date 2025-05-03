import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar' 

const DashboardLaytout = async ({children} : {children : React.ReactNode}) => {



  return (
    <div className="h-full relative">
       <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed  bg-gray-900'>
           <Sidebar  />
       </div>
       <main className="md:pl-72 "> 
        <Navbar/>
        {children}
       </main>
    </div>
  )
}

export default DashboardLaytout

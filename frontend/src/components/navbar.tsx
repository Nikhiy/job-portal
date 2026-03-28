"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Briefcase, Home, Info, User } from 'lucide-react'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu=()=>{
        setIsOpen(!isOpen)
    }

    const isAuth=false;

    const logoutHandler=()=>{}

  return <nav className='z-50 sticky top-0 bg-background/80 border-b backdrop-blur-mb shadow-sm'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
                <Link href={'/'} className='flex items-center gap-1 group'>
                <div className="text-2xl font-bold tracking-tight">
                    <span className='bg-linear-to-r from bg-blue-600 to-blue-800 bg-clip-text text-transparent'>Hire</span>
                    <span className='text-red-500'>Heaven</span>
                </div>
                </Link>
            </div>
            <div className='hidden md:flex items-center space-x-1'>
                <Link href={'/'}>
                <Button variant={"ghost"} className='flex items-center gap-2 font-medium'><Home size={16} />Home</Button>
                </Link>

                <Link href={'/jobs'}>
                <Button variant={"ghost"} className='flex items-center gap-2 font-medium'><Briefcase size={16} />Jobs</Button>
                </Link>

                <Link href={'/about'}>
                <Button variant={"ghost"} className='flex items-center gap-2 font-medium'><Info size={16} />About</Button>
                </Link>
            </div>

            <div className='hidden md:flex items-center gap-3'>
                {isAuth ? <></> : <Link href={'/login'}><Button className='gap-2' >
                    <User size={16} />Sign In</Button></Link>}
            </div>
        </div>
    </div>
  </nav>
}

export default NavBar

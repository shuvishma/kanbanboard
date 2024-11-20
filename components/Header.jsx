import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import UserMenu from '../components/user-menu';
import {checkUser} from '@/lib/checkUser';
import UserLoading from './user-loading';

const Header = async() => {
  await checkUser();
  return (
    <header className='container mx-auto'>
      <nav className='py-6 px-4 flex justify-between items-center'>
        <Link href={'/'}>
          <Image alt='logo' src='/kanbanLogo.png' width={50} height={50} className='h-10 w-auto object-contain' />
        </Link>

        <div className='flex items-center gap-4'>
          <Link href={'/project/create'}>
            <Button variant={'ghost'} className='flex items-center gap-2'>
              <PenBox size={18} />
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl={'/onboarding'}>
              <Button variant={'outline'}>Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
          
        </div>
      </nav>

      <UserLoading />
    </header>
  )
}

export default Header;
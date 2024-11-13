'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import logo from '@/assets/images/logo.svg';
import siteBanner from '@/assets/images/banner.png';
import banner from '@/assets/images/book-krlo-banner.svg';

export default function Component() {
    const [isListEventModalOpen, setIsListEventModalOpen] =
        React.useState(false);

    return (
        <div className='min-h-screen bg-black text-white flex flex-col'>
            <nav className='border-b border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center'>
                            <Link
                                href='/'
                                className='text-2xl font-bold text-emerald-400'
                            >
                                <Image
                                    src={logo}
                                    alt='Company Logo'
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <div className='hidden md:block ml-10'>
                                <div className='flex items-center space-x-4'>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white px-3 py-2'
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Button
                            className='bg-primary-600 hover:bg-primary-700 rounded-full'
                            onClick={() => setIsListEventModalOpen(true)}
                        >
                            List Your Event
                        </Button>
                    </div>
                </div>
            </nav>

            <div className='flex-grow'>
                <div className='fill max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative w-full rounded-3xl overflow-hidden'>
                    <div className='rounded-3xl overflow-hidden'>
                        <Image
                            src={banner}
                            alt='Site banner'
                            objectFit='cover'
                            priority
                            className='rounded-3xl overflow-hidden'
                        />
                    </div>
                </div>

                <div className='text-center max-w-2xl mx-auto mt-8'>
                    <h1 className='text-4xl font-bold mb-2 text-primary-500'>
                        Events
                    </h1>
                </div>

                <div className='fill max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4 relative w-full rounded-3xl overflow-hidden'>
                    <div className='rounded-3xl overflow-hidden transition-opacity duration-300 hover:opacity-85'>
                        <Link href='/inspirecon24' className='block'>
                            <Image
                                src={siteBanner}
                                alt='Event banner'
                                objectFit='cover'
                                priority
                                className='rounded-3xl overflow-hidden'
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <footer className='bg-gray-800 border-t border-gray-700'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        <div>
                            <h3 className='text-lg font-semibold mb-4 text-primary-600 text-center'>
                                Socials
                            </h3>
                            <div className='flex space-x-4 items-center justify-center'>
                                <Link
                                    href='https://www.facebook.com/bookkrlof'
                                    aria-label='Facebook'
                                    className='text-gray-300 hover:text-white'
                                >
                                    <Facebook className='w-6 h-6' />
                                </Link>
                                <Link
                                    href='https://www.instagram.com/bookkrlo/'
                                    aria-label='Instagram'
                                    className='text-gray-300 hover:text-white'
                                >
                                    <Instagram className='w-6 h-6' />
                                </Link>
                            </div>
                        </div>
                        {/* <div>
                            <h3 className='text-lg font-semibold mb-4 text-white'>
                                Resources
                            </h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-gray-300 hover:text-white'
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                        <div>
                            <h3 className='text-lg font-semibold mb-4 text-primary-600 text-center'>
                                Contact
                            </h3>
                            <p className='text-gray-300 text-center'>
                                bookkrlo.info@gmail.com
                            </p>
                        </div>
                        <div className='flex space-x-4 items-center justify-center'>
                            <Link
                                href='/'
                                className='text-2xl font-bold text-emerald-400 text-center'
                            >
                                <Image
                                    src={logo}
                                    alt='Company Logo'
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </Link>
                            <p className='text-gray-300 mt-2 text-center'>
                                Event near or far, just book krlo yaar!
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <Dialog
                open={isListEventModalOpen}
                onOpenChange={setIsListEventModalOpen}
            >
                <DialogContent className='bg-gray-800 border-gray-700 text-gray-200 rounded-3xl'>
                    <DialogHeader>
                        <DialogTitle>List Your Event</DialogTitle>
                        <DialogDescription className='text-gray-200'>
                            For registration, contact bookkrlo.info@gmail.com
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <p>
                            Please reach out to us via email to list your event.
                            We'll be happy to assist you with the process.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsListEventModalOpen(false)}
                        className='bg-primary-600 hover:bg-primary-700 rounded-full'
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

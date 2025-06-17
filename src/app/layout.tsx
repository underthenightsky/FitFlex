

import type { Metadata } from 'next'
import { ConvexProvider } from "convex/react";
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ConvexClerkProvider from '../providers/ConvexClerkProvider';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDumbbell } from '@fortawesome/free-solid-svg-icons'
import ConvexReactProvider from '@/lib/ConvexReactProvider';
import { Suspense } from 'react';
import LoadingAnimation from './loading';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FlexFit - AI Trainer',
  description: 'Sleek , modern AI Trainer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <ConvexReactProvider >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} >
        
              <header className="sticky top-2.5 left-0 z-50 bg-#0A0C14 flex flex-row">
             
           
              <Navbar/>
              
              </header>
              
                       <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
            <div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          {/* flex grow alllows the main content to take all the space it needs */}
          <main className='pt-5 flex-grow '>
             <Suspense fallback={<LoadingAnimation />}>{children}</Suspense></main>   
          <Footer/>  
            
        </body>
      </html>
      </ConvexReactProvider>
      </ConvexClerkProvider>
   
  )
}
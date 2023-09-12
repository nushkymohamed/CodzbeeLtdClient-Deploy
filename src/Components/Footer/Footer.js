import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/logo.png';
function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg  shadow-xl ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="" className="flex items-center mb-4 sm:mb-0">
              <img src={Logo} className={'h-[50px]'} alt="Budjet Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Budjet
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-blue-950 sm:mb-0 dark:text-blue-950">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-blue-950 sm:text-center dark:text-blue-950">
            © 2023{' '}
            <a href="" className="hover:underline">
              Budjet™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;

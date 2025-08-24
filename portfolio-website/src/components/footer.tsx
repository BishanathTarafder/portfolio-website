import Link from 'next/link';
import { GithubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from './icons';

export function Footer() {
  return (
    <footer className="bg-AAprimary text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Links - Left Side (Desktop) - Removed */}

        {/* Email - Right Side (Desktop) - Removed */}

        {/* Mobile Footer */}
        <div className="lg:hidden flex flex-col items-center justify-center">
          <div className="flex space-x-5 sm:space-x-6 mb-3 sm:mb-4">
            <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
          </div>
          <div className="text-center text-xs sm:text-sm text-gray-400">
            <Link href="mailto:saidulmursalinkhan@gmail.com" className="hover:text-AAsecondary transition-colors duration-200">
              saidulmursalinkhan@gmail.com
            </Link>
          </div>
          <div className="mt-3 sm:mt-4 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Saidul Mursalin Khan. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
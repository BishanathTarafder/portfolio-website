import Link from 'next/link';
import { GithubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from './icons';

export function Footer() {
  return (
    <footer className="bg-AAprimary text-white py-8">
      <div className="container mx-auto px-4">
        {/* Social Links - Left Side */}
        <div className="z-10 fixed bottom-0 left-0 hidden lg:flex flex-row px-12 items-center justify-between">
          <div className="flex flex-col space-y-8 justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-5">
              <div>
                <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer">
                  <GithubIcon />
                </Link>
              </div>
              <div>
                <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                </Link>
              </div>
              <div>
                <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                  <TwitterIcon />
                </Link>
              </div>
              <div>
                <Link href="https://instagram.com" target="_blank" rel="noreferrer">
                  <InstagramIcon />
                </Link>
              </div>
            </div>
            <div className="h-28 w-0.5 bg-gray-400"></div>
          </div>
        </div>

        {/* Email - Right Side */}
        <div className="z-10 fixed bottom-0 -right-10 hidden lg:flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-32 justify-center items-center">
            <div style={{transform: 'rotate(90deg)'}}>
              <Link href="mailto:saidulmursalinkhan@gmail.com" target="_blank" rel="noreferrer">
                <span className="font-Header tracking-wider text-gray-400 hover:text-AAsecondary hover:cursor-pointer">
                  saidulmursalinkhan<span className="text-AAsecondary">@</span>gmail<span className="text-AAsecondary">.</span>com
                </span>
              </Link>
            </div>
            <div className="h-24 w-0.5 bg-gray-400"></div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden flex flex-col items-center justify-center">
          <div className="flex space-x-6 mb-4">
            <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer">
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer">
              <LinkedInIcon className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="text-center text-sm text-gray-400">
            <Link href="mailto:saidulmursalinkhan@gmail.com" className="hover:text-AAsecondary">
              saidulmursalinkhan@gmail.com
            </Link>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Saidul Mursalin Khan. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import DrawerButton from '@/components/DrawerButton';
import Footer from '@/components/footer/Footer';
import { CurrencyProvider } from '@/components/header/CurrencyProvider';  // Import CurrencyProvider
import Header from '@/components/header/Header';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';


const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Kashaf Fabrics',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {/* Wrap CurrencyProvider around the Providers */}
          <CurrencyProvider>
            <div className='drawer'>
              <DrawerButton />
              <div className='drawer-content'>
                <div className='flex min-h-screen flex-col'>
                  <Header />
                  {children}
                  <Footer />
                </div>
              </div>
              <div className='drawer-side'>
                <label
                  htmlFor='my-drawer'
                  aria-label='close sidebar'
                  className='drawer-overlay'
                ></label>
                <Sidebar />
              </div>
            </div>
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

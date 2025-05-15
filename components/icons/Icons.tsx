import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:gap-6 sm:gap-x-4 md:gap-x-6 lg:grid-cols-4'>
      <div className='flex flex-col justify-center gap-2 bg-base-300 px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8'>
        <Truck className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        <div className='flex flex-col gap-1 text-xs sm:text-sm'>
          <p><strong>Free Shipping</strong></p>
          <p>Order above $200</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-2 bg-base-300 px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8'>
        <Wallet className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        <div className='flex flex-col gap-1 text-xs sm:text-sm'>
          <p><strong>Money-back</strong></p>
          <p>30 days guarantee</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-2 bg-base-300 px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8'>
        <LockKeyhole className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        <div className='flex flex-col gap-1 text-xs sm:text-sm'>
          <p><strong>Secure Payments</strong></p>
          <p>Secured by Stripe</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-2 bg-base-300 px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8'>
        <Phone className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1} />
        <div className='flex flex-col gap-1 text-xs sm:text-sm'>
          <p><strong>24/7 Support</strong></p>
          <p>Phone and Email support</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;

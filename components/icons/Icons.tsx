import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:gap-6 sm:gap-x-4 md:gap-x-6 lg:grid-cols-4'>
      {[ 
        { Icon: Truck, title: 'Free Shipping', desc: 'Order above $200' },
        { Icon: Wallet, title: 'Money-back', desc: '30 days guarantee' },
        { Icon: LockKeyhole, title: 'Secure Payments', desc: 'Secured by Stripe' },
        { Icon: Phone, title: '24/7 Support', desc: 'Phone and Email support' }
      ].map(({ Icon, title, desc }, idx) => (
        <div
          key={idx}
          className='flex flex-col justify-center gap-2 bg-gradient-to-br from-black to-yellow-500 text-white px-2 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8 rounded-md shadow-lg'
        >
          <Icon className='w-8 h-8 sm:w-10 sm:h-10' strokeWidth={1.5} />
          <div className='flex flex-col gap-1 text-xs sm:text-sm'>
            <p className='font-semibold'>{title}</p>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Icons;

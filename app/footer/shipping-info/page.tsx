import { FaTruck, FaShippingFast, FaBoxOpen } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const ShippingInfo = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Shipping Information
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          At Kashaf Fabrics, we ensure quick and reliable delivery of your orders. Here’s everything you need to know about our shipping process.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Icon Section 1: Shipping Process */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaTruck className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Standard Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer standard shipping for all orders, ensuring timely and secure delivery.
            </p>
          </div>

          {/* Icon Section 2: Fast Shipping */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaShippingFast className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Express Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Need your fabrics fast? Choose express shipping for faster delivery at an additional cost.
            </p>
          </div>

          {/* Icon Section 3: Free Shipping */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaBoxOpen className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Free Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer free shipping on orders above a certain value. Check our shipping policy for details.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            We are committed to providing you with a seamless and pleasant shopping experience, from order placement to delivery.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ShippingInfo;

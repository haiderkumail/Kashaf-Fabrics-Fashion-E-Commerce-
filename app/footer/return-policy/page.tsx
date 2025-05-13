import { FaRedo, FaBox, FaHeadset } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const ReturnPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Return Policy
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          At <strong>Kashaf Fabrics</strong>, we strive to ensure customer satisfaction with every purchase. Our return policy is designed to make the return process easy and hassle-free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Icon Section 1: Return Eligibility */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaRedo className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Return Eligibility</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Returns are accepted within 7 days of receiving your order. Please ensure items are unused, unwashed, and in original condition.
            </p>
          </div>

          {/* Icon Section 2: Exclusion for Customized Products */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaBox className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Exclusion for Customized Products</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Customized or tailored products are not eligible for return. Please review your custom orders carefully before confirming.
            </p>
          </div>

          {/* Icon Section 3: Support Contact */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaHeadset className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Contact Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any issues or concerns about a return, please contact our support team before returning any items to ensure smooth processing.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            We aim to make the return process as easy and efficient as possible, ensuring you are satisfied with your shopping experience at Kashaf Fabrics.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ReturnPolicy;

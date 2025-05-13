import { FaDollarSign, FaBoxOpen, FaUndo } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const RefundPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Refund Policy
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          At <strong>Kashaf Fabrics</strong>, your satisfaction is our top priority. If you&apos;re not happy with your purchase, our refund policy ensures a straightforward process to assist you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Icon Section 1: Refund Eligibility */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaDollarSign className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Refund Eligibility</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can request a refund within 7 days of delivery if the item is unused, unwashed, and in its original packaging.
            </p>
          </div>

          {/* Icon Section 2: Product Inspection */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaBoxOpen className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Product Inspection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Once we receive and inspect the returned product, a refund will be issued to your original payment method.
            </p>
          </div>

          {/* Icon Section 3: Shipping Fees */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaUndo className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Shipping Fees</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please note that shipping fees are non-refundable under any circumstances.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            We are committed to providing the best experience for our customers, ensuring a smooth and hassle-free refund process.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RefundPolicy;

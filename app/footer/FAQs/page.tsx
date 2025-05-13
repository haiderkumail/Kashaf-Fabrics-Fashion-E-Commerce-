import { FaQuestionCircle, FaRegSmile } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const FAQs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Frequently Asked Questions (FAQs)
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          Here are some of the most common questions we receive. If you can’t find the answer you’re looking for, feel free to contact us.
        </p>

        <div className="space-y-8">
          {/* FAQ Section 1 */}
          <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaQuestionCircle className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">How do I place an order?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simply browse through our collection, select your fabric, and add it to your cart. Then, proceed to checkout to complete the purchase.
            </p>
          </div>

          {/* FAQ Section 2 */}
          <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaRegSmile className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Do you offer discounts?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! We regularly offer discounts on selected fabrics. Be sure to subscribe to our newsletter for updates on sales and promotions.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            Have more questions? Contact our support team, and we&apos;ll be happy to assist you!
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default FAQs;

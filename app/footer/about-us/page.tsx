import { FaIndustry, FaHandHoldingHeart, FaRegLightbulb } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
  About Kashaf Fabrics
</h1>

        
        <p className="text-base leading-relaxed mb-6 dark:text-white">
          Welcome to Kashaf Fabrics — your trusted destination for premium fabrics. Our mission is to bring tradition and modernity together, offering quality textiles that suit every occasion.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Icon Section 1: Tradition and Quality */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaIndustry className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Quality Fabrics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              With years of expertise in the fabric industry, we ensure every piece we deliver speaks of elegance and comfort.
            </p>
          </div>

          {/* Icon Section 2: Customer Focus */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaHandHoldingHeart className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Customer Centric</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We prioritize our customers&apos; needs, ensuring that every fabric we offer is of the highest quality and meets your expectations.
            </p>
          </div>

          {/* Icon Section 3: Innovation */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaRegLightbulb className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Innovation & Tradition</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our goal is to blend modern innovation with the rich traditions of fabric crafting, ensuring both durability and style.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            Thank you for choosing Kashaf Fabrics to be a part of your wardrobe. We strive to bring you the best in every thread.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;

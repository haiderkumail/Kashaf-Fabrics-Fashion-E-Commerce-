import { FaShieldAlt, FaUserShield, FaLock } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Privacy Policy
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          At <strong>Kashaf Fabrics</strong>, your privacy is important to us. We take the protection of your personal information seriously.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Icon Section 1: Data Collection */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaShieldAlt className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Data Collection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We collect personal information solely to fulfill your orders, improve your shopping experience, and provide customer support.
            </p>
          </div>

          {/* Icon Section 2: Data Sharing */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaUserShield className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Data Sharing</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We do not sell or share your data with third parties except as required for payment processing and order delivery.
            </p>
          </div>

          {/* Icon Section 3: Data Security */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaLock className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Data Security</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All your data is handled securely and in compliance with applicable privacy laws and regulations.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            Your trust is important to us. Thank you for choosing Kashaf Fabrics, where your privacy is always respected.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy;

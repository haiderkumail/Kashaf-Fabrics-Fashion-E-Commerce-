import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import Footer from '@/components/footer/Footer';

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content dark:text-white">
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center leading-relaxed dark:text-white">
          Contact Us
        </h1>

        <p className="text-base leading-relaxed mb-6 dark:text-white">
          We’re here to help! If you have any questions or need assistance, feel free to reach out to us through any of the following methods:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Phone Contact */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaPhoneAlt className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Call us at <strong>(123) 456-7890</strong> for immediate assistance.
            </p>
          </div>

          {/* Email Contact */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaEnvelope className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Reach us at <strong>support@kashafabrics.com</strong> for inquiries.
            </p>
          </div>

          {/* Location Contact */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <FaMapMarkerAlt className="text-4xl mb-4 text-primary mx-auto" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Our Location</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Visit us at <strong>123 Kashaf St, Lahore, Pakistan</strong>.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl dark:text-white">
            We are always happy to assist you. Don&apos;t hesitate to reach out with any questions.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ContactUs;

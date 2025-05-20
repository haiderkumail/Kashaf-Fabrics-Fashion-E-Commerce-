import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black to-yellow-500 text-white py-10 mt-10 border-t border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Kashaf Fabrics</h2>
          <p className="text-sm">
            Premium quality fabrics crafted with elegance and tradition. Your
            trusted online fabric destination.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/footer/about-us" className="hover:underline">About Us</Link></li>
            <li><Link href="/footer/policy-privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/footer/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li><Link href="/footer/return-policy" className="hover:underline">Return Policy</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/footer/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/footer/FAQs" className="hover:underline">FAQs</Link></li>
            <li><Link href="/footer/shipping-info" className="hover:underline">Shipping Info</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="font-medium">Email:</span> info@kashaffabrics.com</li>
            <li><span className="font-medium">Phone:</span> +92 300 1234567</li>
            <li>
              <span className="font-medium">Branch 1:</span><br />
              123 Main Bazaar, Faisalabad, Pakistan
            </li>
            <li>
              <span className="font-medium">Branch 2:</span><br />
              456 Commercial Area, Lahore, Pakistan
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center mt-8 text-sm text-yellow-100">
        &copy; {new Date().getFullYear()} Kashaf Fabrics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

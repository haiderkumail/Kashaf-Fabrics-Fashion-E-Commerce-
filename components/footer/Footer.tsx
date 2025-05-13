import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 mt-10 border-t">
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
            <li><Link href="/footer/about-us">About Us</Link></li>
            <li><Link href="/footer/policy-privacy">Privacy Policy</Link></li>
            <li><Link href="/footer/refund-policy">Refund Policy</Link></li>
            <li><Link href="/footer/return-policy">Return Policy</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/footer/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/footer/FAQs" className="hover:underline">FAQs</Link></li>
            <li><Link href="/footer/shipping-info" className="hover:underline">Shipping Info</Link></li>
            {/* <li><Link href="/track-order" className="hover:underline">Track Order</Link></li> */}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary">Facebook</a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">Instagram</a>
            <a href="#" aria-label="Twitter" className="hover:text-primary">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Kashaf Fabrics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

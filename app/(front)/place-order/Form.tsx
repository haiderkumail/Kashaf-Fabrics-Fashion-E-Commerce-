'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import StripeCheckoutForm from '@/components/checkout/StripeCheckoutForm';
import { useCurrency } from '@/components/header/CurrencyProvider';
import useCartService from '@/lib/hooks/useCartStore';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Form = () => {
  const router = useRouter();
  const { currency, convertPrice } = useCurrency();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items: items.map((item) => ({
            ...item,
            image: item.image, // Include image
            color: item.color, // Include color
          })),
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),

      });

      const data = await res.json();

      if (res.ok) {
        setOrderId(data.order._id);
        toast.success('Order placed successfully');

        // If payment method is not Stripe, finalize here
        if (paymentMethod !== 'Stripe') {
          clear(); // Clear the cart
          return router.push(`/order/${data.order._id}`); // Redirect to order page
        }

        // Don't redirect or clear here for Stripe yet (wait for successful payment)
      } else {
        toast.error(data.message);
      }
    },
  );

  const { trigger: updatePaymentStatus, isMutating: isUpdatingPayment } = useSWRMutation(
    `/api/orders/${orderId}/payment`,
    async () => {
      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentStatus: 'Paid',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Payment successful, your order is confirmed');
        setPaymentSuccessful(true);
        clear(); // Now we clear the cart without redirecting
        return router.push(`/order/${orderId}`); // Now we redirect to the order page
      } else {
        toast.error(data.message);
      }
    },
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }
  }, [items.length, paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>Loading...</>;

  const convertedItemsPrice = convertPrice(itemsPrice);
  const convertedTaxPrice = convertPrice(taxPrice);
  const convertedShippingPrice = convertPrice(shippingPrice);
  const convertedTotalPrice = convertPrice(totalPrice);

  const handlePaymentSuccess = async () => {
    if (!orderId) {
      toast.error("Order ID is missing.");
      return;
    }

    try {
      await updatePaymentStatus();
    } catch (error) {
      toast.error("There was an error processing the payment.");
    }
  };

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className='my-4 grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <p>Phone: {shippingAddress.phoneNumber}</p>
              <p>Email: {shippingAddress.email}</p> {/* Added email display */}
              <div>
                <Link className='btn' href='/shipping'>
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Payment Method</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className='btn' href='/payment'>
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Items</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className='px-2'>
                            {item.name}({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>
                        {currency} {convertPrice(item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className='btn' href='/cart'>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>Order Summary</h2>
              <ul className='space-y-3'>
                <li>
                  <div className=' flex justify-between'>
                    <div>Items</div>
                    <div>
                      {currency} {convertedItemsPrice.toFixed(2)}
                    </div>
                  </div>
                </li>
                <li>
                  <div className=' flex justify-between'>
                    <div>Tax</div>
                    <div>
                      {currency} {convertedTaxPrice.toFixed(2)}
                    </div>
                  </div>
                </li>
                <li>
                  <div className=' flex justify-between'>
                    <div>Shipping</div>
                    <div>
                      {currency} {convertedShippingPrice.toFixed(2)}
                    </div>
                  </div>
                </li>
                <li>
                  <div className=' flex justify-between'>
                    <div>Total</div>
                    <div>
                      {currency} {convertedTotalPrice.toFixed(2)}
                    </div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className='btn btn-primary w-full'
                  >
                    {isPlacing && (
                      <span className='loading loading-spinner'></span>
                    )}
                    Place Order
                  </button>
                </li>

                {paymentMethod === 'Stripe' && orderId && !paymentSuccessful && (
                  <li className='mt-4'>
                    <h2 className='text-lg font-bold mb-2'>Pay with Stripe</h2>
                    <Elements stripe={stripePromise}>
                      <StripeCheckoutForm
                        totalAmount={convertedTotalPrice}
                        onPaymentSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  </li>
                )}

                {paymentSuccessful && (
                  <li className='text-green-500'>
                    Payment successful! Your order has been confirmed.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

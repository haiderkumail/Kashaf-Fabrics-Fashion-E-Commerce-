import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react';

interface StripeCheckoutFormProps {
  totalAmount: number;
  onPaymentSuccess: () => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.error(error);
    } else {
      // Call the onPaymentSuccess prop after a successful payment
      onPaymentSuccess();
    }
  };

  const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      lineHeight: '24px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      backgroundColor: '#ffffff', // White background for input
      padding: '12px', // Optional: adds some spacing
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: false,
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <CardElement options={cardElementOptions} />

      {/* Customized Pay Button with theme-based text color */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
        >
          Pay {totalAmount.toFixed(2)}
        </button>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;

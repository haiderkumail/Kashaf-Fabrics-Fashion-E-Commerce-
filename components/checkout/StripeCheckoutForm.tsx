// StripeCheckoutForm.tsx

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
        // Define the styles here
        fontSize: '16px',
        lineHeight: '24px',
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true, // This removes the zip code field
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <button type="submit" disabled={!stripe}>
        Pay {totalAmount}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;

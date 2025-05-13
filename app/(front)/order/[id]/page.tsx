import { Metadata } from 'next';
import OrderDetails from './OrderDetails';

type Props = {
  params: {
    id: string;
  };
};

// Properly typed metadata generator for dynamic routes
export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Order ${params.id}`,
  };
};

// Page Component with correct typing
const OrderDetailsPage = ({ params }: Props) => {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;

import { Metadata } from 'next';

import OrderDetails from './OrderDetails';

type Props = {
  params: {
    id: string;
  };
};

// Fix: async and correctly typed props
export const generateMetadata = async (
  { params }: Props
): Promise<Metadata> => {
  return {
    title: `Order ${params.id}`,
  };
};

const OrderDetailsPage = ({ params }: Props) => {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;

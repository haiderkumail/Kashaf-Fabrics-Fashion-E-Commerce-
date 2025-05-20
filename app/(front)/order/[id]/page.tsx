import { Metadata } from 'next';

import OrderDetails from './OrderDetails';

// Metadata generator for dynamic routes
export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  return {
    title: `Order ${params.id}`,
  };
};

const OrderDetailsPage = ({ params }: { params: { id: string } }) => (
  <OrderDetails orderId={params.id} />
);

export default OrderDetailsPage;

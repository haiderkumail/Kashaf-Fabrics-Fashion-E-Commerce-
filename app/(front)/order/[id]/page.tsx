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

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetails orderId={params.id} />;
}

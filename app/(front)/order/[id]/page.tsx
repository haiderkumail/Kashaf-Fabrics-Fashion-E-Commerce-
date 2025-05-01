import OrderDetails from './OrderDetails';

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  // Return metadata directly based on the resolved params
  return {
    title: `Order ${params.id}`,
  };
};

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;

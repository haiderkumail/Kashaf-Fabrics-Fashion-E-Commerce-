import OrderDetails from './OrderDetails';

// Define the type for the props
interface PageProps {
  params: {
    id: string;
  };
}

// Function to generate metadata based on the `id`
export const generateMetadata = ({ params }: PageProps) => {
  return {
    title: `Order ${params.id}`,
  };
};

// Main OrderDetailsPage component
const OrderDetailsPage = ({ params }: PageProps) => {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;

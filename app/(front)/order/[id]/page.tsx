import { Metadata } from 'next';
import OrderDetails from './OrderDetails';

type PageProps = {
  params: {
    id: string;
  };
};

// ✅ Use inline type in generateMetadata to avoid inference issues
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
  };
}

// ✅ You can still use the type for the page component
export default function OrderDetailsPage({ params }: PageProps) {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
}

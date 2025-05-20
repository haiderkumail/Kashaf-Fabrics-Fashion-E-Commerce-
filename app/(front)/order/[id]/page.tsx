import { Metadata } from 'next';
import OrderDetails from './OrderDetails';

// DO NOT export this type — keep it local if you want
type PageProps = {
  params: {
    id: string;
  };
};

// ✅ Correct inline type for generateMetadata (do NOT use `PageProps` here)
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
  };
}

// ✅ Page component using `params` (you can use your type here safely)
export default function OrderDetailsPage({ params }: PageProps) {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  );
}

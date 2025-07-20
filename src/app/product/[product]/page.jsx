import ProductClient from '@/components/Product/ProductClient';

export default function Page({ params }) {
  const slug = params.product;
  return <ProductClient slug={slug} />;
}

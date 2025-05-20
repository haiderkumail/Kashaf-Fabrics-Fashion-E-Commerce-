import Link from 'next/link';

import ProductItem from '@/components/products/ProductItem';
import { Rating } from '@/components/products/Rating';
import productServices from '@/lib/services/productService';

function sanitizeProduct(product: any) {
  return {
    ...product,
    _id: product._id.toString(),
    colors: product.colors?.map((color: any) => ({
      ...color,
      _id: color._id.toString(),
    })),
    sizes: product.sizes || [],
  };
}

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const { q = 'all', category = 'all', price = 'all', rating = 'all' } = searchParams;

  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
              ${category !== 'all' ? ` : Category ${category}` : ''}
              ${price !== 'all' ? ` : Price ${price}` : ''}
              ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
    limit: 4,
  });

  if (!products) {
    return <div className="text-center py-10 text-lg">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <details className="md:hidden mb-4">
        <summary className="btn btn-primary btn-block">Filters</summary>
        <div className="p-4 bg-base-100 rounded-box mt-2 border border-base-300">
          <div className="mb-6">
            <div className="font-bold text-lg mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`btn btn-sm ${'all' === category ? 'btn-primary' : 'btn-ghost'}`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
              {categories.map((c: string) => (
                <Link
                  key={c}
                  className={`btn btn-sm ${c === category ? 'btn-primary' : 'btn-ghost'}`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-bold text-lg mb-2">Price</div>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`btn btn-sm ${'all' === price ? 'btn-primary' : 'btn-ghost'}`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
              {prices.map((p) => (
                <Link
                  key={p.value}
                  href={getFilterUrl({ p: p.value })}
                  className={`btn btn-sm ${p.value === price ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="font-bold text-lg mb-2">Customer Review</div>
            <div className="flex flex-col gap-2">
              <Link
                href={getFilterUrl({ r: 'all' })}
                className={`btn btn-sm ${'all' === rating ? 'btn-primary' : 'btn-ghost'}`}
              >
                Any
              </Link>
              {ratings.map((r) => (
                <Link
                  key={r}
                  href={getFilterUrl({ r: `${r}` })}
                  className={`btn btn-sm ${`${r}` === rating ? 'btn-primary' : 'btn-ghost'}`}
                >
                  <div className="flex items-center gap-2">
                    <Rating value={r} caption={''} />
                    <span>& up</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </details>

      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-5">
        <div className="hidden md:block">
          <div className="py-2 text-xl">Categories</div>
          <ul>
            <li>
              <Link
                className={`link-hover link ${'all' === category ? 'link-primary font-semibold underline' : ''}`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link-hover link ${c === category ? 'link-primary font-semibold underline' : ''}`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <div className="py-2 text-xl">Price</div>
            <ul>
              <li>
                <Link
                  className={`link-hover link ${'all' === price ? 'link-primary font-semibold underline' : ''}`}
                  href={getFilterUrl({ p: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    href={getFilterUrl({ p: p.value })}
                    className={`link-hover link ${p.value === price ? 'link-primary font-semibold underline' : ''}`}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="py-2 text-xl">Customer Review</div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href={getFilterUrl({ r: 'all' })}
                  className={`link-hover link ${'all' === rating ? 'link-primary font-semibold underline' : ''}`}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    href={getFilterUrl({ r: `${r}` })}
                    className={`link-hover link ${`${r}` === rating ? 'link-primary font-semibold underline' : ''}`}
                  >
                    <Rating caption={' & up'} value={r} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="flex flex-col justify-between py-4 md:flex-row">
            <div className="flex items-center flex-wrap gap-2 mb-2 md:mb-0">
              {products.length === 0 ? 'No' : countProducts} Results
              {q !== 'all' && q !== '' && ' : ' + q}
              {category !== 'all' && ' : ' + category}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {(q !== 'all' && q !== '') ||
              category !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <Link className="btn btn-ghost btn-sm" href="/search">
                  Clear
                </Link>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm md:text-base">Sort by:</span>
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  className={`btn btn-sm ${sort === s ? 'btn-primary' : 'btn-ghost'}`}
                  href={getFilterUrl({ s })}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="w-full max-w-screen-xl mx-auto px-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <div key={product.slug} className="flex justify-center">
                    <div className="w-[150%] sm:w-full">
                      <ProductItem product={sanitizeProduct(product)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="join mt-5 flex flex-wrap justify-center">
              {products.length > 0 &&
                Array.from(Array(pages).keys()).map((p) => (
                  <Link
                    key={p}
                    className={`btn join-item ${Number(page) === p + 1 ? 'btn-active' : ''}`}
                    href={getFilterUrl({ pg: `${p + 1}` })}
                  >
                    {p + 1}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

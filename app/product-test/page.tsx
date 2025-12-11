// app/product-test/page.tsx
import { client } from '@/lib/urql'; // 确保路径对
import { gql } from 'urql';
import { ProductConfigurator } from '@/components/product/ProductConfigurator';

const GET_PRODUCT_QUERY = gql`
  query GetProduct {
    # 🔴 注意：把下面的 "pard-nv007sp2" 换成你后台真实的 Slug！
    product(id: "nv007sp2", idType: SLUG) {
      name
      ... on VariableProduct {
        price
        variations {
          nodes {
            id
            databaseId
            price
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default async function Page() {
    const { data } = await client.query(GET_PRODUCT_QUERY, {}).toPromise();
    const product = data?.product;

    if (!product) return <div className="p-20 text-center">Product not found (Check Slug)</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <ProductConfigurator product={product} />
        </div>
    );
}
// lib/queries.ts
import { gql } from 'urql';

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        sku
        attributes {
          nodes {
            id
            name
            options
            variation
          }
        }
        variations(first: 100) {
          nodes {
            databaseId
            name
            price
            regularPrice
            salePrice
            sku
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

import { cacheExchange, createClient, fetchExchange } from 'urql';

const API_URL = 'http://founderblog.exongear.com/graphql';


export const client = createClient({
  url: API_URL,
  exchanges: [cacheExchange, fetchExchange],
});
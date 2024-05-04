import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils';
const url = '/products?featured=true';

const featuredProductQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get(url),
};

export const loader = (queryClient) => async () => {
  const resp = await queryClient.ensureQueryData(featuredProductQuery);
  console.log(resp);
  const products = resp.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
export default Landing;

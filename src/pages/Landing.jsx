import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils';
const url = '/products?featured=true';

const featuredProductQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get(url),
};

export const loader = (queryClient) => async () => {
  const resp = await queryClient.ensureQueryData(featuredProductQuery);

  const products = resp.data.attributes;
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

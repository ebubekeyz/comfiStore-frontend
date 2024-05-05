import { FeaturedProducts, Hero } from '../components';

const url = '/products?featured=true';

export const loader = async () => {
  return null;
};

const Landing = () => {
  return (
    <>
      <h1 className="text-3xl">Hello</h1>
    </>
  );
};
export default Landing;

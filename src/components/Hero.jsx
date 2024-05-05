import { Link } from 'react-router-dom';

import hero1 from '../assets/gown1.jpg';
import hero2 from '../assets/ring1.jpg';
import hero3 from '../assets/necklace1.jpg';
import hero4 from '../assets/gown2.jpg';

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      {/* INFO */}
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In qui vitae
          et corrupti aliquid modi. Doloremque dolor illum voluptatem sapiente.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary uppercase">
            oUR Products
          </Link>
        </div>
      </div>
      {/* CAROUSEL */}
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full object-cover w-80"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;

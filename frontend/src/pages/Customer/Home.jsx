import FeaturedServices from "../../components/FeaturedServices/FeaturedServices";

const Home = () => {
  return (
    <>
      <section className="bg-indigo-600 py-24 text-center text-white">
        <h1 className="mb-6 text-6xl font-bold">Celebrate Every Moment</h1>

        <p className="text-xl">
          Book decorators, photographers, DJs and banquet halls.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-4xl font-bold">Featured Services</h2>

        <FeaturedServices />
      </section>
    </>
  );
};

export default Home;

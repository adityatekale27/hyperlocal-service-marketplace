import Layout from "../components/layout/Layout.jsx";
import Hero from "../components/home/Hero.jsx";
import CategorySection from "../components/home/CategorySection.jsx";
import FeaturedServices from "../components/home/FeaturedServices.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import ProfessionalServices from "../components/home/ProfessionalServices.jsx";
import TestimonialSection from "../components/home/TestimonialSection.jsx";
import PromoSection from "../components/home/PromoSection.jsx";
import BecomeProvider from "../components/home/BecomeProvider.jsx";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <CategorySection />
      <FeaturedServices />
      <HowItWorks />
      <ProfessionalServices />
      <PromoSection />
      <TestimonialSection />
      <BecomeProvider />
    </Layout>
  );
};

export default Home;

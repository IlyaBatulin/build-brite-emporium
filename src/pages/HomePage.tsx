
import Layout from "@/components/layout/Layout";
import HomeHero from "@/components/home/HomeHero";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeTools from "@/components/home/HomeTools";
import HomeCategories from "@/components/home/HomeCategories";
import HomeProducts from "@/components/home/HomeProducts";
import HomeCta from "@/components/home/HomeCta";
import FloatingCallButton from "@/components/common/FloatingCallButton";

const HomePage = () => {
  return (
    <Layout>
      <HomeHero />
      <HomeBenefits />
      <HomeTools />
      <HomeCategories />
      <HomeProducts />
      <HomeCta />
      <FloatingCallButton />
    </Layout>
  );
};

export default HomePage;

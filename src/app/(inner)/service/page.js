
import ServiceBanner from "@/components/banner/ServiceBanner";
import BackToTop from "@/components/common/BackToTop";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import ServiceSeven from "@/components/services/ServiceSeven";
import ServiceList from "@/components/services/ServiceList";
import SolutionCounter from "@/components/services/SolutionCounter";
import LargeImage from "@/components/large-video/LargeImage";
import FeatureTwo from "@/components/feature/FeatureTwo";
import CtaFive from "@/components/cta/CtaFive";
import TestimonialsFive from "@/components/testimonials/TestimonialsFive";
import CtaSix from "@/components/cta/CtaSix";

export default function Home() {
    return (
        <div className='#'>
            <HeaderTwo />
            <ServiceBanner />
            <ServiceSeven />
            <ServiceList />
            <LargeImage />
            <SolutionCounter />
            <FeatureTwo />
            <CtaFive />
            {/* <TestimonialsFive/> */}
            <CtaSix/>
            <FooterOne />
            <BackToTop />
        </div>
    );
}

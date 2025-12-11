
import PromoBanner from '@/components/home/PromoBanner';
import HeroProduct from '@/components/home/HeroProduct';
import SeriesGrid from '@/components/home/SeriesGrid';
import ServiceGrid from '@/components/home/ServiceGrid';
import VideoCarousel from '@/components/home/VideoCarousel';
import BlogMarquee from '@/components/home/BlogMarquee';
import ProductPromoBar from '@/components/product/ProductPromoBar';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 顶部促销条 */}
      <PromoBanner />
      {/* 产品一：NV007SP2 */}
      <HeroProduct
        category="Night Vision Clip-on"
        model="Pard NV007SP2"
        tagline="4K LRF · Compact & Powerful"
        imageSrc="/images/NV007SP2_01.jpg"
        linkHref="/buy/nv007sp2-demo"
      />

      {/* 产品二：Night Stalker */}
      <HeroProduct
        category="Night Vision Scope"
        model="Night Stalker 4k eX"
        tagline="4K Precision, Unmatched Performance"
        imageSrc="/images/Night-Stalker-4K-ex-01.jpg"
        linkHref="/products/night-stalker-4k"
      />

      {/* 产品三：PANTERA */}
      <HeroProduct
        category="Thermal Imaging Scope"
        model="PANTERA eX 640"
        tagline="Ultra-Sensitive. Razor-Sharp."
        imageSrc="/images/Pantera-ex-640-1.jpg"
        linkHref="/products/pantera-ex-640"
      />
      <SeriesGrid />
      <VideoCarousel />
    </div>
  );
}
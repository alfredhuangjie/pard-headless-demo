import SeriesCard from './SeriesCard';

export default function SeriesGrid() {
  return (
    <section className="bg-white py-4 px-2 md:px-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Thermal Imaging */}
        <SeriesCard
          eyebrow="Detect subtle temp differences"
          title="THERMAL IMAGING"
          description="Reveal invisible heat signatures."
          imageSrc="/images/Thermal imaging Night-Stalker-4K-Pro-15.png"
          href="/products/thermal"
          imageScale={1.7} 
          imageOffsetY="60px" // 👈 关键修改：向下推 40像素，你可以试 30px 或 50px
        />

        {/* 2. Night Vision */}
        <SeriesCard
          eyebrow="Limitless potential at night"
          title="NIGHT VISION"
          description="Unmatched clarity and range."
          imageSrc="/images/night-vision-NV007SP-featured-image-1.png"
          href="/products/night-vision"
          imageScale={0.85} 
          imageOffsetY="-40px"
          // 没写 imageOffsetY 则默认为 0px
        />

        {/* 3. Multi-Spectral */}
        <SeriesCard
          eyebrow="Night vision + Thermal"
          title="MULTI-SPECTRAL"
          description="Thermal and Night Vision fused."
          imageSrc="/images/TD32-LRF-Multi-spectral-Riflescope-02_01.png"
          href="/products/multi-spectral"
          imageScale={1} 
          imageOffsetY="10px" // 稍微往下压一点点也可以
        />

        {/* 4. Accessories */}
        <SeriesCard
          eyebrow="Essential Gear"
          title="ACCESSORIES"
          description="Official power solutions and mounts."
          imageSrc="/images/NV007SP-Quick-Release-Adapter-3.png"
          href="/products/accessories"
          imageScale={1.2} 
          imageOffsetY="7px"
        />

      </div>
    </section>
  );
}

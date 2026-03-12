import { bannerTexts } from "@/constants";

export const FooterBanner = () => {
  const loopTexts = [...bannerTexts, ...bannerTexts];

  return (
    <div className="w-full overflow-hidden bg-[#EF4444] py-7">
      <div className="flex w-max animate-marquee whitespace-nowrap gap-10 pl-10">
        {loopTexts.map((text, index) => (
          <p key={index} className="text-2xl font-bold text-white shrink-0">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

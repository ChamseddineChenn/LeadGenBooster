import { Link } from 'react-router-dom';
import * as assets from '../assets/assets';

const BulletTickIcon = ({ size = 'h-8 w-8' }) => (
  <span
    aria-hidden="true"
    className={`mt-0.5 shrink-0 ${size}`}
    style={{
      backgroundColor: '#D71C1C',
      WebkitMaskImage: `url(${assets.tickIcon})`,
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskImage: `url(${assets.tickIcon})`,
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      maskSize: 'contain',
    }}
  />
);

const Banner = () => {
  return (
    <section
      className="pt-28 md:pt-32 bg-white"
      aria-label="Banniere principale"
    >
      <div className="relative w-full">

        {/* ── Desktop banner image (sm and above) ── */}
        <img
          src={assets.bannerImage}
          alt="Banniere Presence digitale 360"
          className="hidden sm:block w-full h-auto max-w-none"
          loading="eager"
          decoding="async"
        />

        {/* ── Mobile banner image (below sm — covers phones up to ~639px) ── */}
        <img
          src={assets.mobileBannerImage}
          alt="Banniere Presence digitale 360"
          className="block sm:hidden w-full h-auto max-w-none"
          loading="eager"
          decoding="async"
        />

        {/* ── Desktop content overlay (sm and above) ── */}
        <div className="hidden sm:grid absolute inset-0 grid-cols-2 items-center gap-[8%] px-[6%] md:px-[7%] lg:pr-[2%] lg:pl-[4%]">
          {/* Left content block */}
          <div className="w-full text-white">
            <h2 className="text-lg md:text-3xl lg:text-7xl font-extrabold leading-[1.05] mb-6 md:mb-16 ml-[8%]">
              Présence digitale{' '}
              <span className="font-black text-[#D71C1C]">360°</span>
            </h2>

            <ul className="grid grid-cols-2 w-[112%] -ml-[8%] gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-8 text-xs md:text-sm lg:text-2xl font-medium leading-tight md:leading-snug mb-3 md:mb-5">
              <li className="flex items-start gap-2">
                <BulletTickIcon />
                <span>identité Visuelle</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletTickIcon />
                <span>Réseaux Sociaux</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletTickIcon />
                <span>Contenu & SEO</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletTickIcon />
                <span>Développement Web</span>
              </li>
            </ul>

            <div className="flex pt-10">
              <img
                className="h-15 w-15"
                src={assets.curvedarrowicon}
                alt="Curved arrow icon"
              />
              <Link
                to="/services"
                className="inline-flex items-center translate-y-4 border-2 rounded p-2 border-[#D71C1C] ml-[8%] gap-2 md:gap-3 text-xs md:text-sm lg:text-lg font-extrabold tracking-wide uppercase hover:text-[#D71C1C] transition-colors"
              >
                <span>DÉCOUVRIR NOS SERVICES</span>
              </Link>
            </div>
          </div>

          {/* Right content block */}
          <div className="w-full text-white">
            <p className="text-xs md:text-base lg:text-5xl font-extrabold leading-tight mb-2 md:mb-3">
              Vos prochains clients vous cherchent.
            </p>

            <h3
              className="text-xs md:text-xl lg:text-6xl text-black font-extrabold leading-tight mb-2 md:mb-4"
              style={{
                textShadow:
                  '0 -1px 0 rgba(255,255,255,0.9), 0 -2px 0 rgba(255,255,255,0.65), 0 -4px 8px rgba(255,255,255,0.35)',
              }}
            >
              On les trouve.
            </h3>
            <div className="w-2/5 border-t-2 border-white/95 mb-3 md:mb-5" />

            <p className="text-xs md:text-xs lg:text-2xl font-medium leading-tight md:leading-snug mb-3 md:mb-5">
              Des prospects qualifiés,
              <br />
              chaque semaine. Sans effort de votre part.
            </p>

            <div className="flex pt-10">
              <img
                className="h-15 w-15"
                src={assets.curvedarrowicon}
                alt="Curved arrow icon"
              />
              <Link
                to="/contact"
                className="inline-flex items-center translate-y-4 border-2 rounded p-2 border-black ml-[8%] gap-2 md:gap-3 text-xs md:text-sm lg:text-lg font-extrabold tracking-wide uppercase hover:text-black transition-colors"
              >
                <span>COMMENCER MAINTENANT</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Mobile content overlay (below sm) ── */}
        {/* Mobile banner: top half = red, bottom half = dark */}
        <div className="sm:hidden absolute inset-0 flex flex-col">

          {/* Top half — over the red zone */}
          {/* "On les trouve." uses white text here (red bg); black would also work but white reads cleaner */}
          <div className="h-1/2 flex flex-col justify-center px-5 text-white">
            <p className="text-sm font-extrabold leading-tight mb-1">
              Vos prochains clients vous cherchent.
            </p>
            <h3 className="text-2xl font-extrabold leading-tight mb-2 text-white">
              On les trouve.
            </h3>
            <div className="w-10 border-t-2 border-white/80 mb-2" />
            <p className="text-[11px] font-medium leading-snug mb-4">
              Des prospects qualifiés,<br />
              chaque semaine. Sans effort de votre part.
            </p>
            <Link
              to="/contact"
              className="self-start border-2 rounded px-3 py-1.5 border-white text-[10px] font-extrabold tracking-wide uppercase hover:border-black hover:text-black transition-colors"
            >
              COMMENCER MAINTENANT
            </Link>
          </div>

          {/* Bottom half — over the dark zone */}
          <div className="h-1/2 flex flex-col justify-center px-5 text-white">
            <h2 className="text-xl font-extrabold leading-tight mb-3">
              Présence digitale{' '}
              <span className="font-black text-[#D71C1C]">360°</span>
            </h2>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] font-medium leading-tight mb-4">
              <li className="flex items-center gap-1.5">
                <BulletTickIcon size="h-5 w-5" />
                <span>Identité Visuelle</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BulletTickIcon size="h-5 w-5" />
                <span>Réseaux Sociaux</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BulletTickIcon size="h-5 w-5" />
                <span>Contenu & SEO</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BulletTickIcon size="h-5 w-5" />
                <span>Développement Web</span>
              </li>
            </ul>
            <Link
              to="/services"
              className="self-start border-2 rounded px-3 py-1.5 border-[#D71C1C] text-[10px] font-extrabold tracking-wide uppercase hover:text-[#D71C1C] transition-colors"
            >
              DÉCOUVRIR NOS SERVICES
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;

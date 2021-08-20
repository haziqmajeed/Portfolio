import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from 'src/components/AboutJerseyWater/AboutTabs/arrowComponent.module.scss';

export default function App({ data }) {
  useEffect(() => {
    Aos.init({ duration: 1500, disable: 'mobile' });
  }, []);

  return (
    <div>
      <div
        className={`${styles.VCFlowchart} grid grid-cols-2 gap-4 mt-3 justify-items-center`}
      >
        <div data-aos="slide-up" className={styles.circleCSS1}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 1" />
        </div>
        <div data-aos="slide-up" className={styles.circleCSS2}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 2" />
        </div>

        <div data-aos="slide-up" className={styles.verticesCSS1}>
          <img src="/images/flowChart/Vertices.png" alt="flow chart vertices 1" />
        </div>
        <div data-aos="slide-up" className={styles.verticesCSS2}>
          <img src="/images/flowChart/Vertices.png" alt="flow chart vertices 2" />
        </div>
      </div>

      <div
        className={`${styles.HBFlowchart} grid grid-cols-1 gap-4 justify-items-center`}
      >
        <div data-aos="zoom-in" className={styles.horizontalLine}>
          <img
            src="/images/flowChart/HorizontalOrange.png"
            width="653"
            alt="horizontal orange"
          />
        </div>
        <div
          data-aos="slide-up"
          className={`bg-brand-orange ${styles.banner} flex justify-center max-w-full px-4 mt-24 text-white`}
        >
          <div className="pt-6 pb-6">
            <p className="font-museo text-center text-lg">
              {data.aboutTabSolutionsHeading}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${styles.LCFlowchart} grid grid-cols-1 gap-4 justify-items-center`}
      >
        <div data-aos="fade-left" className={styles.line1}>
          <img src="/images/flowChart/smallHorizontal.png" alt="small horizontal 1" />
        </div>
        <div data-aos="fade-left" className={styles.circle1}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 3" />
        </div>
        <div
          data-aos="fade-right"
          className={`bg-brand-blue p-1 pl-2 pr-2 ${styles.blueDiv1}`}
        >
          <p className="text-white text-center font-museo text-base">
            CLEAN WATER AND WATERWAYS
          </p>
        </div>
        <div data-aos="fade-right" className={styles.line2}>
          <img src="/images/flowChart/smallHorizontal.png" alt="small horizontal 2" />
        </div>
        <div data-aos="fade-right" className={styles.circle2}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 4" />
        </div>
        <div
          data-aos="fade-left"
          className={`bg-brand-blue p-1 pl-2 pr-2 ${styles.blueDiv2}`}
        >
          <p className="text-white text-center font-museo text-base">
            HEALTHIER, SAFER NEIGHBORHOODS
          </p>
        </div>
        <div data-aos="fade-left" className={styles.line3}>
          <img src="/images/flowChart/smallHorizontal.png" alt="small horizontal 3" />
        </div>
        <div data-aos="fade-left" className={styles.circle3}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 5" />
        </div>
        <div
          data-aos="fade-right"
          className={`bg-brand-blue p-1 pl-2 pr-2 ${styles.blueDiv3}`}
        >
          <p className="text-white text-center font-museo text-base">
            LOCAL JOBS
          </p>
        </div>
        <div data-aos="fade-right" className={styles.line4}>
          <img src="/images/flowChart/smallHorizontal.png" alt="small horizontal 4" />
        </div>
        <div data-aos="fade-right" className={styles.circle4}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 6" />
        </div>
        <div
          data-aos="fade-left"
          className={`bg-brand-blue p-1 pl-2 pr-2 ${styles.blueDiv4}`}
        >
          <p className="text-white text-center font-museo text-base">
            FLOOD AND CLIMATE RESILIENCE
          </p>
        </div>
        <div data-aos="fade-left" className={styles.line5}>
          <img src="/images/flowChart/smallHorizontal.png" alt="small horizontal 5" />
        </div>
        <div data-aos="fade-left" className={styles.circle5}>
          <img src="/images/flowChart/RightCircle.png" alt="flow chart right circle 7" />
        </div>
        <div
          data-aos="fade-right"
          className={`bg-brand-blue p-1 pl-2 pr-2 ${styles.blueDiv5}`}
        >
          <p className="text-white text-center font-museo text-base">
            ECONOMIC GROWTH
          </p>
        </div>
        <div data-aos="zoom-in" className={styles.verticalMidLine}>
          <img src="/images/flowChart/VerticalOrange.png" alt="vertical orange" />
        </div>
      </div>

      <div
        className={`${styles.LBFlowchart} grid grid-cols-1 gap-4 justify-items-center px-4 sm:px-0`}
      >
        <div
          className={`border-4 border-brand-orange rounded-sm ${styles.banner2}`}
          data-aos="slide-right"
        >
          <div className="p-1" data-aos="slide-right">
            <Link href={data.aboutTabSolutionsButtonUrl ?? ''}>
              <a
                 target="_blank" rel="noopener"
                data-aos="zoom-in"
                className="flex justify-center py-2 px-4 m-auto bg-brand-orange text-white text-base text-center"
              >
                {data.aboutTabSolutionsButtonText}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

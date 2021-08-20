import cn from "classnames";
import Link from 'next/link';
import { sanitize } from "src/utils/miscellaneous";
import styles from 'src/components/Join/Join.module.scss';
import Head from "next/head";
export default function ImageComponent({ data }) {
    
    
    
    
    
    return (
        <>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200&display=swap" rel="stylesheet"/>

      </Head>
        <div
            className={cn(
              styles.keyPriorities,
              "relative border-b-4 border-solid border-brand-orange-light mr-auto"
            )}
          
           
          >
            <Link href="#">
              <a className="block w-full h-full">
                <img src="/images/test.jpg" alt="" />
                <div
                  className={cn(
                    styles.box,
                    "absolute left-0 bottom-0 w-full max-w-xl px-6 flex flex-col justify-center"
                  )}
                >
                  <div className="text-xl text-white 2xl:text-2xl">
                    Dolore velit occaecat qui laboris excepteur duis consequat adipisicing.
                    <img
                      src="/images/right-arrow-white1.svg"
                      width={30}
                      className="hover-view inline-block ml-2"
                      alt="Right arrow"
                    />
                  </div>
                  <div
                    className={`${cn(styles.text)} text-white 2xl:text-lg`}
                    dangerouslySetInnerHTML={{
                      __html: sanitize("Elit id sint irure ipsum eu eiusmod"),
                    }}
                  />
                  
                </div>
                <div className="absolute -bottom-1 py-1 px-2 right-0 2xl:py-3 2xl:px-4 2xl:text-xl" style={{backgroundColor:"#b8dfd9",fontFamily:"Montserrat"}}>Volunteer</div>
                
              </a>
            </Link>
          </div>

        </>
    )}
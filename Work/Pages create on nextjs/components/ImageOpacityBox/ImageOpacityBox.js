import { makeStyles } from '@material-ui/core';
import Image from 'next/image';
import styles from 'src/components/ImageOpacityBox/ImageOpacityBox.module.scss'
import { sanitize } from 'src/utils/miscellaneous';
import Head from 'next/head';


export default function ImageOpacityBox({ icon , heading , textParagraph,backgroundPicture ,fontFamily, link}) {
const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
    },
    iconSize:{
      minWidth:"90% !important",
      minHeight:"90% !important"
  },
  }))

  const classes = useStyles();
    return(
        <>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200&display=swap" rel="stylesheet"/>

      </Head>
            <div className={`grid justify-items-center content-center h-96 border-b-4`} style={{backgroundImage:`url(${backgroundPicture})` ,borderColor:"#ffc145"}}>           
              <a 
              target= '_blank'
              href={`${link}`}
              className={` ${styles.snbnepPara} grid p-8 gap-2`}
              >
             
              { icon ? <div className={`rounded-full h-12 w-12 grid justify-self-center cursor-pointer border-2 border-white`} style={{backgroundColor:"white"}}>
              
                  <Image
                    src={icon}
                    width={50}
                    className={classes.iconSize}
                    height={50}
                    alt="Color contrast"
                  /> 
                               
                
                </div> : "" }

                <h1 className="text-3xl w-96 grid justify-self-center text-center 2xl:text-4xl 2xl:w-5/12" style={fontFamily ? {fontFamily:"Montserrat"}: {fontFamily:""}}>{heading}</h1>
                <div
                  className="text-2xl font-medium mt-3 mb-3 text-center 2xl:text-3xl"
                  dangerouslySetInnerHTML={{
                  __html: sanitize(textParagraph),
                  }}
              />
                  <Image
                            src="/images/right-arrow-black.svg"
                            width={17}
                            
                            height={17}
                            className={`inline-block ml-4 mb-1`}
                            alt="Right arrow"
                  />
            
              </a>
            </div>
        </>
    )
}
import Image from 'next/image';

export default function BackgroundBanner(props) {
    console.log("props",props);
    const {background,front,front2,front3} = props

    return (
        
        <div className=''>
            <div className='backgroundBanner__parent'>
                <Image src={background?.sourceUrl} height='1300' width='3000'/> 
                <div className='backgroundBanner__child'>
                 <Image src={front?.sourceUrl} height='400' width='200'/>
                </div>
                <div className='backgroundBanner__child2'>
                 <Image src={front2?.sourceUrl} height='400' width='200'/>
                </div>
                <div className='backgroundBanner__child3'>
                 <Image src={front3?.sourceUrl} height='400' width='200'/>
                </div>
            </div>
            
        </div>
       
    )
}


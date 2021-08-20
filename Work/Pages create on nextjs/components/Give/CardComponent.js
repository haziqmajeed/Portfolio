export default function CardComponent({ image , heading }) {

    return (
        <div className="w-80 h-80 2xl:w-96 2xl:h-96" style={{backgroundColor:"#f5f5f4"}}>
            <div className="grid place-items-center pt-12"><img className="fill-current rounded-full w-32 h-32 2xl:w-40 2xl:h-40" src={image}/></div>      
            <div className="text-xl text-center p-12 2xl:text-2xl">
                <h1 class="">{heading}</h1>
            </div>
        </div>
    )}
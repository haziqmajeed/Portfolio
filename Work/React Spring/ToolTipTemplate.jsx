
import Link from 'next/link';
import { sanitize } from "src/utils/miscellaneous";
import styles from 'src/components/AboutJerseyWater/AboutTabs/ToolTipTemplate.module.scss';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Body from 'react-bootstrap/Popover'
const ToolTipTemplate = (props) => {
  return (
    <OverlayTrigger
    trigger="click"
 //   show={props.toolTipState}
    rootClose
    key='top'
    placement='top'
    overlay={
      <Popover className={`${styles.borderColor} bg-white p-8`}
   
      >
       
        <Body>
        <div className="grid justify-items-center">
        <div
     
     className="text-lg text-center font-normal"
     dangerouslySetInnerHTML={{
       __html: sanitize(props.description),
     }}
   />
      <Link href={props.buttonUrl ?? '#'}>
        <a className="min-h-12 inline-flex justify-center items-center py-2 px-8 text-base text-center bg-brand-blue text-white mt-6">
        {props.buttonData}
        </a>
      </Link>
      <img
        style={{ zIndex: '1', left: '48.33%', bottom: '-1rem' }}
        className="absolute"
        src="/images/flowChart/RightCircle.png"
      />
    </div>
        </Body>
      </Popover>
    }
  >
      {props.content}
  </OverlayTrigger>
  );
};

export default ToolTipTemplate

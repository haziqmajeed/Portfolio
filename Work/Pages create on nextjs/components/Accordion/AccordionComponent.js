import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Image from "next/image";
import { sanitize } from "src/utils/miscellaneous";

export default function AccordionComponent({
  image,
  heading,
  text,
  imgWidth,
  imgHeight,
  noIcon,
  noBorder,
  bgColor,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      background: bgColor ?? "#fff",
      "&.Mui-expanded": {
        margin: ".5rem 0",
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
    border: {
      borderBottomLeftRadius: "0px !important",
      borderBottomRightRadius: "0px !important",
      borderTopRightRadius: "0px !important",
      borderTopLeftRadius: "0px !important",
      boxShadow: "0px !important",
      "&::before": {
        display: "none",
      },
    },
    iconSize: {
      minWidth: imgWidth,
      minHeight: imgHeight,
    },
    marginSize: {
      marginTop: "0px !important",
      marginBottom: "3px !important",
    },
    iconbackgroundColor: {
      backgroundColor: "#ffc145",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Accordion
        className={
          (noBorder ? "" : "border-b-2 border-yellow-400 ") +
          `${classes.border} ${classes.root} ${classes.marginSize}`
        }
        style={{ borderColor: "#ffc145", boxShadow: "0px 0px" }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowRightIcon style={{ fontSize: "36px", color: "black" }} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {noIcon ? (
            ""
          ) : (
            <div
              className={`${classes.iconbackgroundColor} rounded-full h-8 w-8 mr-4 grid justify-center cursor-pointer 2xl:h-10 2xl:w-10`}
            >
              <Image
                src={image}
                className={classes.iconSize}
                width={50}
                height={50}
                alt="Color contrast"
              />
            </div>
          )}
          <h1 className="text-lg 2xl:text-2xl 2xl:mt-1">{heading}</h1>
        </AccordionSummary>
        <AccordionDetails>
          <div
            className="2xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: sanitize(text),
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import Image from 'next/image';
import { sanitize } from 'src/utils/miscellaneous';
import Link from 'next/link';
import { useSpring, a, config } from '@react-spring/web';
import styles from 'src/components/AboutJerseyWater/AboutTabs/TheCollaborative.module.scss';
import ToolTipCollab from 'src/components/AboutJerseyWater/AboutTabs/ToolTipTemplate';
import ReactTooltip from 'react-tooltip';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Body from 'react-bootstrap/Popover';
import toolTipStyle from 'src/components/AboutJerseyWater/AboutTabs/ToolTipTemplate.module.scss';
const calc = (x, y, rect, zAxis) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  zAxis,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const TheCollaborative = ({ data }) => {
  const [SupportingMembers, setSupportingMembers] = useState(false);
  const [Network, setNetwork] = useState(false);
  const [Backbone, setBackbone] = useState(false);
  const [SteeringCommittee, setSteeringCommittee] = useState(false);

  const AssetRef = useRef(null);
  const EducationRef = useRef(null);
  const GreenRef = useRef(null);
  const CombinedSewerRef = useRef(null);
  const LeadTaskRef = useRef(null);
  const DataCommitteeRef = useRef(null);
  //For Every card and buttons have diffrent animation so create seprate states for each

  const [Asset, setAsset] = useState([0, 0, 1]);
  const [Education, setEducation] = useState([0, 0, 1]);
  const [Green, setGreen] = useState([0, 0, 1]);
  const [CombinedSewer, setCombinedSewer] = useState([0, 0, 1]);
  const [LeadTask, setLeadTask] = useState([0, 0, 1]);
  const [DataCommittee, setDataCommittee] = useState([0, 0, 1]);

  //set Configuration on each div
  const [Precision, setPrecision] = useState(0.0);
  const [Friction, setFriction] = useState(50);
  const [Tension, setTension] = useState(200);

  const props = useSpring({
    // default,molasses,slow,stiff,wobbly,gentle
    Asset,
    Education,
    Green,
    CombinedSewer,
    LeadTask,
    DataCommittee,
    transform: `perspective(12px) scale(${SupportingMembers ? 0.9 : 1})`,
    networkTransform: `perspective(12px) scale(${Network ? 0.9 : 1})`,
    backboneTransform: `perspective(12px) scale(${Backbone ? 0.9 : 1})`,
    steeringCommitteeTransform: `perspective(12px) scale(${
      SteeringCommittee ? 1.05 : 1
    })`,
    config: {
      mass: 1,
      tension: Tension,
      friction: Friction,
      precision: Precision,
    },
  });

  const [showVideo, setVideo] = useState(false);

  const openCollabVideo = () => {
    setVideo(true);
  };
  const openCollabChart = () => {
    setVideo(false);
  };

  return (
    <div>
      <div className="flex flex-row w-1/2 mx-auto px-2">
        <div className="collab-tab-item w-64 px-2 ml-auto">
          <a
            className={
              'collab-tab block font-museo text-lg uppercase text-center cursor-pointer' +
              (showVideo ? '' : ' text-brand-blue')
            }
            onClick={openCollabChart}
          >
            {data.pageBy.about.collaborativeTab1Label}
          </a>
        </div>
        <div className="collab-tab-item w-64 pr-2 mr-auto">
          <a
            className={
              'collab-tab block font-museo text-lg uppercase text-center cursor-pointer' +
              (showVideo ? ' text-brand-blue' : '')
            }
            onClick={openCollabVideo}
          >
            {data.pageBy.about.collaborativeTab2Label}
          </a>
          <img
            src="/images/video-page-youtube-icon.png"
            className={styles.youtubeIcon}
            alt="YouTube icon"
          />
        </div>
      </div>
      {!showVideo ? (
        <>
          <div
            className="w-1/2 mx-auto my-16 text-brand-gray-typo text-xl text-center"
            dangerouslySetInnerHTML={{
              __html: sanitize(data.pageBy.about?.collaborativeTab1IntroText),
            }}
          />
          <div className="text-center">
            <Link href={'/about/goals/' ?? '#'} passHref>
              <a
                target="_blank"
                rel="noopener"
                className={`bg-gray-700 px-5 py-5 flex justify-center m-auto font-museo tracking-widest uppercase text-white text-lg text-center ${styles.textOpacitypoint8}`}
              >
                SHARED GOALS & COMMON AGENDAS
              </a>
            </Link>

            <div className="grid grid-cols-4 grid-rows-2 gap-0 pt-4 px-4 pb-0">
              <div>
                <div
                  className={`rounded-full h-10 w-10 ${styles.CollabWaterCircle} ${styles.CollabWaterCircle1BackgroundColor}`}
                >
                  <h1 className="p-2 text-white">1</h1>
                </div>
                <div
                  className="text-left text-xl pl-12"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(data.thecollaboratives.nodes[0].content),
                  }}
                />
              </div>

              <div>
                <div
                  className={`bg-orange rounded-full h-10 w-10 ${styles.CollabWaterCircle} ${styles.CollabWaterCircle2BackgroundColor}`}
                >
                  <h1 className="p-2 text-white">2</h1>
                </div>
                <div
                  className="text-left text-xl pl-12"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(data.thecollaboratives.nodes[1].content),
                  }}
                />
              </div>

              <div>
                <div
                  className={`bg-blue-500 rounded-full h-10 w-10 ${styles.CollabWaterCircle}`}
                >
                  <h1 className="p-2 text-white">3</h1>
                </div>
                <div
                  className="text-left text-xl pl-12"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(data.thecollaboratives.nodes[2].content),
                  }}
                />
              </div>

              <div>
                <div
                  className={`bg-gray-600 rounded-full h-10 w-10 ${styles.CollabWaterCircle}`}
                >
                  <h1 className="p-2 text-white">4</h1>
                </div>
                <div
                  className="text-left text-xl pl-12"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(data.thecollaboratives.nodes[3].content),
                  }}
                />
              </div>
              <div
                className={`${styles.CollabWaterDrop} ${styles.CollabWaterCircle1BackgroundColor}`}
              ></div>
              <div
                className={`bg-orange ${styles.CollabWaterDrop} ${styles.CollabWaterCircle2BackgroundColor}`}
              ></div>
              <div className={`bg-blue-500 ${styles.CollabWaterDrop}`}></div>
              <div className={`bg-gray-600 ${styles.CollabWaterDrop}`}></div>
            </div>

            <ToolTipCollab
              content={
                <a.div
                  className={`${styles.CollabWaterCircle2BackgroundColor} ${styles.cursorChange}  px-5 py-6`}
                  onMouseMove={() => {
                    setPrecision(0.0);
                    setFriction(20);
                    setTension(200);
                    setSupportingMembers(true);
                  }}
                  onMouseLeave={() => {
                    setSupportingMembers(false);
                  }}
                  style={{ transform: props.transform }}
                >
                  <div className="flex text-white">
                    <a
                      className={`flex justify-center font-museo tracking-widest text-base uppercase py-2 px-4 m-auto text-white text-lg text-center ${styles.textOpacitypoint8}`}
                    >
                      {
                        data.thecollaboratives.nodes[12].thecollaborativemeta
                          .description
                      }
                    </a>
                  </div>
                </a.div>
              }
              description={data.thecollaboratives.nodes[12].content}
              buttonData={
                data.thecollaboratives.nodes[12].thecollaborativemeta.buttontext
              }
              buttonUrl={
                data.thecollaboratives.nodes[12].thecollaborativemeta.buttonUrl
              }
            />

            <div className="grid grid-row-2 mt-2 grid-cols-7 gap-2">
              <OverlayTrigger
                trigger="click"
                //   show={props.toolTipState}
                rootClose
                key="top"
                placement="top"
                overlay={
                  <Popover
                    className={`${toolTipStyle.steeringToolTipCustomCss} bg-white p-8`}
                  >
                    <Body>
                      <div className="grid justify-items-center">
                        <div
                          className="text-lg text-center font-normal"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              data.thecollaboratives.nodes[4].content
                            ),
                          }}
                        />
                        <Link
                          href={
                            data.thecollaboratives.nodes[4].thecollaborativemeta
                              .buttonUrl ?? '#'
                          }
                        >
                          <a className="min-h-12 inline-flex justify-center items-center py-2 px-8 text-base text-center bg-brand-blue text-white mt-6">
                            {
                              data.thecollaboratives.nodes[4]
                                .thecollaborativemeta.buttontext
                            }
                          </a>
                        </Link>
                        <img
                          style={{
                            zIndex: '1',
                            left: '42.33%',
                            bottom: '-1rem',
                          }}
                          className="absolute"
                          src="/images/flowChart/RightCircle.png"
                          alt="flow chart right circle"
                        />
                      </div>
                    </Body>
                  </Popover>
                }
              >
                <a.div
                  className={`bg-blue-800 grid p-12 justify-center ${styles.CollabSteeringCommittee} ${styles.cursorChange}`}
                  onMouseMove={() => {
                    setPrecision(0.0);
                    setFriction(50);
                    setTension(200);
                    setSteeringCommittee(true);
                  }}
                  onMouseLeave={() => {
                    setSteeringCommittee(false);
                    ReactTooltip.hide();
                  }}
                  style={{ transform: props.steeringCommitteeTransform }}
                >
                  <h1
                    className={`font-museo text-base uppercase tracking-widest text-white ${styles.textOpacitypoint8}`}
                  >
                    {
                      data.thecollaboratives.nodes[4].thecollaborativemeta
                        .description
                    }
                  </h1>
                </a.div>
              </OverlayTrigger>

              <ToolTipCollab
                content={
                  <a.div
                    className={`${styles.CollabWaterShadowedDiv}  grid grid-row-2 p-8 justify-center`}
                    onClick={(e) => {}}
                    ref={AssetRef}
                    onMouseMove={(e) => {
                      const rect = AssetRef.current.getBoundingClientRect();
                      setPrecision(0.0);
                      setFriction(50);
                      setTension(200);
                      setAsset(calc(e.clientX, e.clientY, rect, 1.1));
                    }}
                    style={{ transform: props.Asset.to(trans) }}
                    onMouseLeave={(e) => {
                      // ReactTooltip.hide();

                      setAsset([0, 0, 1]);
                    }}
                  >
                    <div className="shadow-2xl bg-white rounded-full h-16 w-16 justify-self-center">
                      <img
                        className={`${styles.CollabLogoPadding}`}
                        src="/images/asset-management-and-finance-committee.png"
                        alt="Asset Management and Finance Committee"
                      />
                    </div>

                    <div className="pt-4">
                      <a className="font-museo font-medium text-base">
                        {
                          data.thecollaboratives.nodes[6].thecollaborativemeta
                            .description
                        }
                      </a>
                    </div>
                  </a.div>
                }
                description={data.thecollaboratives.nodes[6].content}
                buttonData={
                  data.thecollaboratives.nodes[6].thecollaborativemeta
                    .buttontext
                }
                buttonUrl={
                  data.thecollaboratives.nodes[6].thecollaborativemeta.buttonUrl
                }
              />

              <ToolTipCollab
                content={
                  <a.div
                    className={`${styles.CollabWaterShadowedDiv} grid grid-row-2 p-8 justify-center`}
                    onClick={(e) => {
                      console.log('Education');
                    }}
                    ref={EducationRef}
                    onMouseMove={(e) => {
                      setPrecision(0.0);
                      setFriction(50);
                      setTension(200);
                      const rect = EducationRef.current.getBoundingClientRect();
                      setEducation(calc(e.clientX, e.clientY, rect, 1.1));
                    }}
                    style={{ transform: props.Education.to(trans) }}
                    onMouseLeave={(e) => {
                      ReactTooltip.hide();
                      setEducation([0, 0, 1]);
                    }}
                  >
                    <div className="shadow-2xl bg-white rounded-full h-16 w-16 justify-self-center">
                      <img
                        className={`${styles.CollabLogoPadding}`}
                        src="/images/education-and-outreach-committee.png"
                        alt="Education and Outreach Committee"
                      />
                    </div>
                    <div className="pt-4">
                      <a className="font-museo font-medium text-base ">
                        {
                          data.thecollaboratives.nodes[7].thecollaborativemeta
                            .description
                        }
                      </a>
                    </div>
                  </a.div>
                }
                description={data.thecollaboratives.nodes[7].content}
                buttonData={
                  data.thecollaboratives.nodes[7].thecollaborativemeta
                    .buttontext
                }
                buttonUrl={
                  data.thecollaboratives.nodes[7].thecollaborativemeta.buttonUrl
                }
              />

              <ToolTipCollab
                content={
                  <a.div
                    className={`${styles.CollabWaterShadowedDiv} grid grid-row-2 p-8 justify-center`}
                    ref={GreenRef}
                    onMouseMove={(e) => {
                      setPrecision(0.0);
                      setFriction(50);
                      setTension(200);
                      const rect = GreenRef.current.getBoundingClientRect();
                      setGreen(calc(e.clientX, e.clientY, rect, 1.1));
                    }}
                    style={{ transform: props.Green.to(trans) }}
                    onMouseLeave={(e) => {
                      ReactTooltip.hide();
                      setGreen([0, 0, 1]);
                    }}
                  >
                    <div className="shadow-2xl bg-white rounded-full h-16 w-16 justify-self-center">
                      <img
                        className={`${styles.CollabLogoPadding}`}
                        src="/images/green-infrastructure-committee.png"
                        alt="Green Infrastructure Committee"
                      />
                    </div>
                    <div className="pt-4">
                      <a className="font-museo font-medium text-base">
                        {
                          data.thecollaboratives.nodes[8].thecollaborativemeta
                            .description
                        }
                      </a>
                    </div>
                  </a.div>
                }
                description={data.thecollaboratives.nodes[8].content}
                buttonData={
                  data.thecollaboratives.nodes[8].thecollaborativemeta
                    .buttontext
                }
                buttonUrl={
                  data.thecollaboratives.nodes[8].thecollaborativemeta.buttonUrl
                }
              />

              <ToolTipCollab
                content={
                  <a.div
                    data-tip
                    data-for="CombinedTip"
                    data-event="click focus"
                    className={`${styles.CollabWaterShadowedDiv} grid grid-row-2 p-8 justify-center`}
                    ref={CombinedSewerRef}
                    onMouseMove={(e) => {
                      setPrecision(0.0);
                      setFriction(50);
                      setTension(200);
                      const rect =
                        CombinedSewerRef.current.getBoundingClientRect();
                      setCombinedSewer(calc(e.clientX, e.clientY, rect, 1.1));
                    }}
                    style={{ transform: props.CombinedSewer.to(trans) }}
                    onMouseLeave={(e) => {
                      ReactTooltip.hide();
                      setCombinedSewer([0, 0, 1]);
                    }}
                  >
                    <div className="shadow-2xl bg-white rounded-full h-16 w-16 justify-self-center">
                      <img
                        className={`${styles.CollabLogoPadding}`}
                        src="/images/combined-sew.png"
                        alt="Combined Sewer Overflow Committee"
                      />
                    </div>
                    <div className="pt-4">
                      <a className="font-museo font-medium text-base">
                        {
                          data.thecollaboratives.nodes[9].thecollaborativemeta
                            .description
                        }
                      </a>
                    </div>
                  </a.div>
                }
                description={data.thecollaboratives.nodes[9].content}
                buttonData={
                  data.thecollaboratives.nodes[9].thecollaborativemeta
                    .buttontext
                }
                buttonUrl={
                  data.thecollaboratives.nodes[9].thecollaborativemeta.buttonUrl
                }
              />

              <div className="grid-row-2 col-span-2 gap-4">
                <ToolTipCollab
                  content={
                    <a.div
                      className={`${styles.CollabWaterShadowedDiv} grid grid-cols-2 pt-4 pr-28 pb-8`}
                      ref={LeadTaskRef}
                      onMouseMove={(e) => {
                        setPrecision(0.0);
                        setFriction(50);
                        setTension(200);
                        const rect =
                          LeadTaskRef.current.getBoundingClientRect();
                        setLeadTask(calc(e.clientX, e.clientY, rect, 1.0));
                      }}
                      style={{ transform: props.LeadTask.to(trans) }}
                      onMouseLeave={(e) => {
                        ReactTooltip.hide();
                        setLeadTask([0, 0, 1]);
                      }}
                    >
                      <div
                        className={` ${styles.CollabLeadTask} shadow-2xl bg-white rounded-full h-16 w-16 mt-2 ml-4 justify-self-center`}
                      >
                        <img
                          className={`${styles.CollabLogoPadding}`}
                          src="/images/committees/icon-committee-task.png"
                          alt="Lead Task Force"
                        />
                      </div>
                      <div className="pt-3 w-52 flex flex-wrap content-center">
                        <p className="text-left font-museo font-medium text-base">
                          {
                            data.thecollaboratives.nodes[10]
                              .thecollaborativemeta.description
                          }
                        </p>
                      </div>
                    </a.div>
                  }
                  description={data.thecollaboratives.nodes[10].content}
                  buttonData={
                    data.thecollaboratives.nodes[10].thecollaborativemeta
                      .buttontext
                  }
                  buttonUrl={
                    data.thecollaboratives.nodes[10].thecollaborativemeta
                      .buttonUrl
                  }
                />

                <ToolTipCollab
                  content={
                    <a.div
                      className={`${styles.CollabWaterShadowedDiv} grid grid-cols-2 pt-4 mt-2 pr-28 pb-8`}
                      ref={DataCommitteeRef}
                      onMouseMove={(e) => {
                        setPrecision(0.0);
                        setFriction(50);
                        setTension(200);
                        const rect =
                          DataCommitteeRef.current.getBoundingClientRect();
                        setDataCommittee(calc(e.clientX, e.clientY, rect, 1.0));
                      }}
                      style={{ transform: props.DataCommittee.to(trans) }}
                      onMouseLeave={(e) => {
                        ReactTooltip.hide();
                        setDataCommittee([0, 0, 1]);
                      }}
                    >
                      <div
                        className={` ${styles.CollabLeadTask} shadow-2xl bg-white rounded-full h-16 w-16 mt-2 ml-4 justify-self-center`}
                      >
                        <img
                          className={`${styles.CollabLogoPadding}`}
                          src="/images/committees/icon-committee-data.png"
                          alt="Data Committee/Jersey Watercheck"
                        />
                      </div>
                      <div className="pt-3 w-52 flex flex-wrap content-center">
                        <p className="text-left font-museo font-medium text-base">
                          {
                            data.thecollaboratives.nodes[11]
                              .thecollaborativemeta.description
                          }
                        </p>
                      </div>
                    </a.div>
                  }
                  description={data.thecollaboratives.nodes[11].content}
                  buttonData={
                    data.thecollaboratives.nodes[11].thecollaborativemeta
                      .buttontext
                  }
                  buttonUrl={
                    data.thecollaboratives.nodes[11].thecollaborativemeta
                      .buttonUrl
                  }
                />
              </div>

              {/* Second row */}

              <OverlayTrigger
                trigger="click"
                //   show={props.toolTipState}
                rootClose
                key="top"
                placement="top"
                overlay={
                  <Popover
                    className={`${toolTipStyle.backboneToolTipCustomCss} bg-white p-8`}
                  >
                    <Body>
                      <div className="grid justify-items-center">
                        <div
                          className="text-lg text-center font-normal"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              data.thecollaboratives.nodes[5].content
                            ),
                          }}
                        />
                        <Link
                          href={
                            data.thecollaboratives.nodes[5].thecollaborativemeta
                              .buttonUrl ?? '#'
                          }
                        >
                          <a className="min-h-12 inline-flex justify-center items-center py-2 px-8 text-base text-center bg-brand-blue text-white mt-6">
                            {
                              data.thecollaboratives.nodes[5]
                                .thecollaborativemeta.buttontext
                            }
                          </a>
                        </Link>
                        <img
                          style={{
                            zIndex: '1',
                            left: '42.33%',
                            bottom: '-1rem',
                          }}
                          className="absolute"
                          src="/images/flowChart/RightCircle.png"
                          alt="flow chart right circle"
                        />
                      </div>
                    </Body>
                  </Popover>
                }
              >
                <a.div
                  className={`bg-blue-800 pt-2 ${styles.CollabBackboneOrganization} ${styles.cursorChange}`}
                  onMouseMove={() => {
                    setPrecision(0.0);
                    setFriction(50);
                    setTension(200);
                    setBackbone(true);
                  }}
                  onMouseLeave={() => {
                    setBackbone(false);
                  }}
                  style={{ transform: props.backboneTransform }}
                >
                  <h1
                    className={`font-museo text-base uppercase tracking-widest text-white ${styles.textOpacitypoint8}`}
                  >
                    {
                      data.thecollaboratives.nodes[5].thecollaborativemeta
                        .description
                    }
                  </h1>
                </a.div>
              </OverlayTrigger>

              <ToolTipCollab
                content={
                  <a.div
                    data-tip
                    data-for="Network"
                    data-event="click focus"
                    className={`${styles.CollabNetworkButton} ${styles.cursorChange} col-span-6 px-5 py-5`}
                    onMouseMove={() => {
                      setPrecision(0.0);
                      setFriction(20);
                      setTension(200);
                      setNetwork(true);
                    }}
                    onMouseLeave={() => {
                      //ReactTooltip.hide();
                      setNetwork(false);
                    }}
                    style={{ transform: props.networkTransform }}
                  >
                    <div className="flex text-white">
                      <a
                        className={`flex justify-center font-museo tracking-widest text-base uppercase py-3 px-4 m-auto text-white text-lg text-center ${styles.textOpacitypoint8}`}
                      >
                        {
                          data.thecollaboratives.nodes[13].thecollaborativemeta
                            .description
                        }
                      </a>
                    </div>
                  </a.div>
                }
                description={data.thecollaboratives.nodes[13].content}
                buttonData={
                  data.thecollaboratives.nodes[13].thecollaborativemeta
                    .buttontext
                }
                buttonUrl={
                  data.thecollaboratives.nodes[13].thecollaborativemeta
                    .buttonUrl
                }
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-1/2 mx-auto my-16 text-brand-gray-typo text-xl text-center"
            dangerouslySetInnerHTML={{
              __html: sanitize(data.pageBy.about?.collaborativeTab2IntroText),
            }}
          />
          <div className="text-center">
            <ReactPlayer
              width={800}
              height={450}
              style={{
                margin: 'auto',
              }}
              playing
              playIcon={
                <div
                  style={{
                    opacity: '1',
                    transition: 'opacity 300ms ease-in-out',
                    borderRadius: '50%',
                    backgroundColor: '#1b3c53',
                    height: '44px',
                    width: '44px',
                    padding: '10px 12px',
                  }}
                >
                  <FaPlay size={25} color={'white'} />
                </div>
              }
              light={true}
              url={data.pageBy.about.collabVideo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TheCollaborative;

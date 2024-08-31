import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Layout } from "antd";
import Swal from "sweetalert2";
import "./style/LikeButton.css";
//css
import "./style/style.css";
import "./style/followButton.css";

//component
import Topmenu from "../component/topmenu";
import "./style/style.css";

import {useNavigate} from "react-router-dom";

//https request
import {
  GetCartoonByID_API,
  GetEpisodesByID_API,
  GetUsersByUsernameAPI,

  //payment
  getPayment,
  UpdatePaymentEp,
} from "../../services/https";

import { 
  //bookshelf/follow
  CreateFollow,
  DeleteFollow,
  CheckCartoonFollowByID 
} from "../../services/https/Bookshelf/bookshelf_follow";

import { 
  //bookshelf/history
  CreateHistory 
} from "../../services/https/Bookshelf/bookshelf_history";
//ratting
import { CreateRating,DeleteRating,CheckCartoonRatingByID } from "../../services/https/Cartoon/rating";

//interface
import { UsersInterface } from "../../interfaces/IUser";
import { FollowInterface } from "../../interfaces/IFollow";
import { SeriesInterface } from "../../interfaces/ISeries";

const { Header, Content } = Layout;

interface Toon {
  ID: number ;
  Epnumber: number;
  Thumbnail: string;
  Title: string;
  Price: string;
  Datetime: string;
}

interface Toons {
  Title: string;
  Summary: string;
  Horizontal_Thumbnail: string;
}

function Cartoon() {
  const [title, setTitle] = useState<Toons>();
  const [products, setProducts] = useState<Toon[]>([]);
  const [member, setMember] = useState<UsersInterface | undefined>(undefined);
  // const [cartoon,setCartoon]=useState<SeriesInterface[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../styles/header";
    script.async = true;
    GetCartoonByID();
    GetEpisodesByID(id);
    GetUsersByUsername();
  }, []);

  useEffect(() => { 
    console.log(cartoon)
    console.log(title)}, [title]);

  const navigate = useNavigate();
  const id = Cookies.get("ID");
  const username = Cookies.get("username");

  const GetCartoonByID = async () => {
    let res = await GetCartoonByID_API(id);
    if (res) {
      setCartoon(res);
      setCartoonLIKE(res); 
      setTitle(res);
    }
  };

  const GetEpisodesByID = async (ID: string | undefined) => {
    let res = await GetEpisodesByID_API(ID);
    if (res) {
      setProducts(res);
    }
  };

  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      setMember(res);
    }
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const [isBoughtMap, setIsBoughtMap] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    products.forEach((p) => {
      if (!isBoughtMap.hasOwnProperty(p.ID)) { // เพิ่ม ID_E ใหม่เข้าไปเฉพาะถ้ายังไม่มีใน isBoughtMap
        setIsBoughtMap((prevIsBoughtMap) => {
          return {
            ...prevIsBoughtMap,
            [p.ID]: false, // สามารถกำหนดค่าเริ่มต้นตามต้องการ
          };
        });
        checkBought(p.ID, member?.ID);
      }
    });
    CheckCartoonFollowByID(member?.ID, cartoon?.ID).then((isFollowed) => {
    setFollow(isFollowed);
    });
    CheckCartoonRatingByID(member?.ID, cartoon?.ID).then((LIKED) => {
      setLIKE(LIKED);
      });
  }, [products, isBoughtMap, member?.ID]);

  //status
  const checkBought = async (ID_E: number | undefined, member_ID: Number | undefined): Promise<React.ReactNode> => {
    let res = await getPayment(ID_E, member_ID);
    setIsBoughtMap((prevIsBoughtMap) => {
      const updatedIsBoughtMap = { ...prevIsBoughtMap };
      if (ID_E !== undefined) {
        updatedIsBoughtMap[ID_E] = res.status;
      } else {
        console.warn("ID_E is undefined. Skipping update.");
      }
      return updatedIsBoughtMap;
    });
    return null;
  };


  //buyep
  const handleClick = (p: Toon) => {
    Swal.fire({
      title: "คุณต้องการชำระเหรียญ?",
      text: `คุณต้องการจ่ายชำระเหรียญจำนวน  ${p.Price} Coin`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(member?.ID);
        console.log(p.ID);
        UpdatePaymentEp(p.ID, member?.ID);
        Swal.fire("ชำระสำเร็จ!", `คุณได้รับ coin จำนวน ${p.Price}`, "success");
        setTimeout(() => window.location.reload(), 800);
      }
    });
  };

  //Part.followButton
  const [follow, setFollow] = useState(false);
  const [cartoon, setCartoon] = useState<Toon>();
  
  const handleFollowButtonClick = () => {
    setFollow(!follow);
    
    if (follow) {
      console.log(follow);
      DeleteFollow(member?.ID, cartoon?.ID);
    } else {
      console.log(follow);
      console.log(member?.ID);
      console.log("cartoon:",cartoon);
      CreateFollow(member?.ID, cartoon?.ID);
    };
  };
  const onClick = (ID: Number , MemberID:Number| undefined , cartoonID:number| undefined) => {
    CreateHistory(MemberID,cartoonID);
    const idEpValues = `${ID}`;
    Cookies.set("ID_ep", idEpValues, { expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
    const id = Cookies.get("ID_ep");
    console.log(id);
    navigate("/Home/cartoon/episodes");
  };


  //Part.raingButton
  const [LIKE, setLIKE] = useState(false);
  const [cartoonLIKE, setCartoonLIKE] = useState<Toon>();
  const [LIKED, setLIKED] = useState<{ [key: number]: boolean }>({});
  const handleLikeClick = () => {
    setLIKE(!LIKE);
    
    if (LIKE) {
      console.log(LIKE);
      DeleteRating(member?.ID, cartoonLIKE?.ID);
    } else {
      console.log(LIKE);
      console.log(member?.ID);
      console.log(cartoonLIKE?.ID);
      CreateRating(member?.ID, cartoonLIKE?.ID);
    };
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 0px",
            color: "white",
            backgroundColor: "white",
            height: "84px",
          }}
        >
          <Topmenu />
        </Header>
        <Content
          style={{ padding: "10px 10px 10px 10px", height: "100%" }}
          className="dashboardbackgroud"
        >
          <div className="dashboardbackgroud">
            <div className="all">
              <div className="top">

                <div className="imageshowInCartoon">
                    <img
                      className="imageshowimage"
                      src={title?.Horizontal_Thumbnail}
                      alt="search--v1"
                    />
                </div>

              </div><div className="below">
                <div className="infobox">
                  <div className="info">

                    <h1 className="toonname">{title?.Title}</h1><br></br><div className="detailinfo">
                      <br></br>
                      <p>
                        {title?.Summary}
                      </p>
                    </div>

                    <div className="showlike"></div>
                    <div className="blankspace"></div>
                    <div className="followNlikeButton">
                    {/* Button_Follow-Start */}
                    
                    <div>
                      {/* Apply the "liked" class when the button is liked */}
                      <div
                        onClick={handleFollowButtonClick}
                        className={follow ? "Followed" : "Follow"}
                      >
                        {follow ? "✔️  Followed" : "➕ Follow"}
                      </div>
                    </div>
                    {/* Button_Follow-End */}

                    <div className="likebutton">
                      <div
                        onClick={handleLikeClick}
                        className={LIKE ? "liked" : "LIKE"}
                      >
                        {LIKE ? "💖 LIKED" : "🤍 LIKE"}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                <div className="eplist">
                  <div className="blankspaceep"></div>
                  <div className="listzone">
                    {products.map((p) => (
                      <div className="list" key={p.ID}>
                        <div className="listbox">
                          <div className="imgEP">
                            <img className="imgForEP" src={p.Thumbnail} />
                          </div>
                          <div className="EPinfoCartoon">
                            <div className="EPNumber">
                              <p className="NumberEPInCartoon">
                                EP.{p.Epnumber}
                              </p>
                            </div>
                            <div className="blankSpaceInEPCartoon1"></div>
                            <div className="toonnameAndDate">
                              <p className="toonnameInCatoon">{p.Title}</p>
                              <p className="DateInCartoon"> {p.Datetime}</p>
                            </div>
                            <div className="blankSpaceInEPCartoon2"></div>

                            <div className="priceInCartoon">
                              {isBoughtMap[p.ID] ? (
                                <div>
                                  <div
                                    style={{ color: "white" }}
                                    onClick={() => onClick(p.ID,member?.ID,cartoon?.ID)}
                                  >
                                    สินค้าถูกซื้อแล้ว!
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="boxforprice"
                                  onClick={() => handleClick(p)}
                                >
                                  <div className="boxprice">
                                    <p className="EPPrice">{p.Price} 🪙</p>
                                  </div>
                                  <div className="blankpriceForBackIn"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout >
    </>
  );
}
export default Cartoon;

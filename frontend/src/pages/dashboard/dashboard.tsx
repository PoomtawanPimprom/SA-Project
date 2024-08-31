import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import Topmenu from "../component/topmenu";
import "./style/style.css";
import {
  GetCartoonByID_API,
  GetCartoonToDashboard,
  GetUsersByUsernameAPI,
} from "../../services/https";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; //npm install js-cookie
//import Menubookshelf from "./component/menubookshelf";
import { GetCartoonRating1stID } from "../../services/https/Cartoon/rating";
import { GetCartoonRating2ndID } from "../../services/https/Cartoon/rating";
import { GetCartoonRating3thID } from "../../services/https/Cartoon/rating";
const { Header, Footer, Sider, Content } = Layout;

interface Toon {
  ID: number;
  Summary:  string;
  Horizontal_Thumbnail : string ;
  Square_Thumbnail: string;
  Title: string;
}

function Dashboard() {
  const [products, setProducts] = useState<Toon[]>([]);

  const [toon1st, set1stcartoon] = useState<string>();
  const [cartoon1st, setCartoon1st] = useState<Toon>();

  const [toon2nd, set2ndcartoon] = useState<string>();
  const [cartoon2nd, setCartoon2nd] = useState<Toon>();

  const [toon3th, set3thcartoon] = useState<string>();
  const [cartoon3th, setCartoon3th] = useState<Toon>();

  const navigate = useNavigate();
  const onClick = (ID: Number | undefined) => {
    const idValues = `${ID}`;
    Cookies.set("ID", idValues, { expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
    const id = Cookies.get("ID");
    console.log(id);
    navigate("/Home/cartoon");
  };

  useEffect(() => {
    const script = document.createElement("script");
    
    script.src = "../styles/header";
    script.async = true;
    Get_Cartoon();
    GetUsersByUsername();
    GetCartoonByIDRating1st();
    GetCartoonByIDRating2nd();
    GetCartoonByIDRating3th();
    
  }, []);

  useEffect(() => {
    console.log(toon1st);
    GetCartoonByID1st();
  }, [toon1st]);

  useEffect(() => {
    console.log(toon2nd);
    GetCartoonByID2nd();
  }, [toon2nd]);

  useEffect(() => {
    console.log(toon3th);
    GetCartoonByID3th();
  }, [toon3th]);

  

  const GetCartoonByIDRating1st = async () => {
    let res = await GetCartoonRating1stID();
    if (res) {
      console.log(res);
      set1stcartoon(res.CartoonID);
    }
  };
  const GetCartoonByIDRating2nd = async () => {
    let res = await GetCartoonRating2ndID();
    if (res) {
      console.log(res);
      set2ndcartoon(res.CartoonID);
    }
  };
  const GetCartoonByIDRating3th = async () => {
    let res = await GetCartoonRating3thID();
    if (res) {
      console.log(res);
      set3thcartoon(res.CartoonID);
    }
  };

  

  const GetCartoonByID1st = async () => {
    let res = await GetCartoonByID_API(toon1st);
    if (res) {
      console.log(res);
      setCartoon1st(res);
    }
  };
  const GetCartoonByID2nd = async () => {
    let res = await GetCartoonByID_API(toon2nd);
    if (res) {
      console.log(res);
      setCartoon2nd(res);
    }
  };
  const GetCartoonByID3th = async () => {
    let res = await GetCartoonByID_API(toon3th);
    if (res) {
      console.log(res);
      setCartoon3th(res);
    }
  };

  const Get_Cartoon = async () => {
    let res = await GetCartoonToDashboard();
    if (res) {
      console.log(res);
      setProducts(res);
    }
  };
  const username = Cookies.get("username");

  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      console.log(res);
    }
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
            <div className="alltop">
              <div className="dashboardmain">
                <div className="imageshow">
                  <img
                    className="imageshowimage"
                    src={cartoon1st?.Horizontal_Thumbnail}
                    alt="search--v1"
                  />
                  {/* <Image
          width={1080}
          max-heigh={480}
          
          preview={{ visible: false,mask: false }}
          
          src="https://cdn.discordapp.com/attachments/1031454676241108993/1157715240750940365/44.jpg?ex=65199dd6&is=65184c56&hm=59d69cb33684bc9ceadb11b702dde439a565eb6edd515c414aaf91518dd05df1&"
        /> */}
                </div>
                <div className="infotop">
                  <div className="infotopbox">
                    <div className="info">
                      <h1 className="toonname">{cartoon1st?.Title}</h1>
                      <br></br>
                      <div className="detailinfodash">
                        <p className="infodashdt">
                        {cartoon1st?.Summary}
                        </p>
                      </div>
                      {/* <div className="showlike">
                        <div className="blankspace"></div>

                        <div className="likeicontop">
                          <p className="sumlike">2.3M</p>
                          <Image
                            width={22}
                            max-heigh={22}

                            preview={{ visible: false, mask: false }}

                            src="https://cdn.discordapp.com/attachments/1031454676241108993/1157715241048752249/like.png?ex=65199dd6&is=65184c56&hm=4a28c3134ae9a37add3161f84a36fcbddae59600f511656fa5cba9fe76ceda90&"
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- rating --> */}
            <div className="ratingshowmain">
              <div className="boxratingshowmain">
                <div className="ratinghead">
                  <span className="headrating">Top 3 </span>
                  <span className="headrating2"> weekly✨</span>
                </div>
                <div className="row">
                  <div className="cartoon">
                    <div className="ratingbox">
                      <div className="ratingtoptoon1" onClick={() => onClick(cartoon1st?.ID)}>
                        <div className="coverpagetoprating">
                        <img className="imgforrating" src={cartoon1st?.Square_Thumbnail}/>
                        </div>
                        <div className="infotoontop">
                          <h1 className="rank1">#1🥇</h1>
                          <h2 className="toptoonname">{cartoon1st?.Title}</h2>
                        </div>
                      </div> 
                    </div>

                    <div className="ratingbox">
                      <div className="ratingtoptoon2" onClick={() => onClick(cartoon2nd?.ID)}>
                        <div className="coverpagetoprating">
                        <img className="imgforrating" src={cartoon2nd?.Square_Thumbnail}/>
                        </div>
                        <div className="infotoontop">
                          <h1 className="rank2">#2🥈</h1>
                          <h2 className="toptoonname">{cartoon2nd?.Title}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="ratingbox">
                      <div className="ratingtoptoon3"onClick={() => onClick(cartoon3th?.ID)}>
                        <div className="coverpagetoprating">
                        <img className="imgforrating" src={cartoon3th?.Square_Thumbnail}/>
                        </div>
                        <div className="infotoontop">
                          <h1 className="rank3">#3🥉</h1>
                          <h2 className="toptoonname">{cartoon3th?.Title}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- showdashboard --> */}

            <div className="cartoonlistshowdashboad">
              <div className="boxcartoonlistshowdashboad">
                <div className="cartoonlistshowdashboadhead">
                  <h1 className="headcartoonlistshowdashboad">Cartoon</h1>
                </div>

                <div className="remforslidebarcartoonlistshowdashboad">
                  <div className="listcartoonlistshowdashboad">
                    {products.map((t) => (
                      <div className="listboxcartoonlistshowdashboad" onClick={() => onClick(t.ID)}>
                        <div className="listshowdashboad">
                          <div className="coverpage1">
                            <img className="coverpage1" src={t.Square_Thumbnail} alt="search--v1" />
                          </div>
                          <div className="infotoonlist1">
                            <h2 className="toonnamelist1">{t.Title}</h2>
                            <h1 className="EP1"> </h1>
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
      </Layout>
    </>
  );
}
export default Dashboard;

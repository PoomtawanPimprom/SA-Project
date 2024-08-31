import React,{ useEffect, useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "./style/bookshelf.css";
import Cookies from 'js-cookie'; 
//component
import Topmenu from "../component/topmenu";
import Menubookshelf from "./component/menubookshelf";
import { UsersInterface } from "../../interfaces/IUser";
import { GetUsersByUsernameAPI } from "../../services/https";
import { GetCartoonPaymentEpisodesByID } from "../../services/https/Bookshelf/bookshelf_bought";
const { Header,  Content } = Layout;

interface Episodes {
  ID:               number;
  Thumbnail:        string;
  Title:            string;
  Datetime:         string;
}
function Bookshelf_bought() {
  const [member, setMember] = useState<UsersInterface | undefined>(undefined);
  const [products, setProducts] = useState<Episodes[]>([]);
  const username = Cookies.get('username');
  const navigate = useNavigate();
  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      setMember(res);
    }
  };

  const getCartoonPaymentEpisodesByID = async (ID: Number | undefined):Promise<any> => {
    let res = await GetCartoonPaymentEpisodesByID(ID);
    if (res) {
      console.log(res);
      setProducts(res);
    }
  };

  useEffect(()=>{
    GetUsersByUsername();
  },[]);

  useEffect(() => {
    if (member?.ID) {
      getCartoonPaymentEpisodesByID(member.ID);
    }
  }, [member]);

  const onClick = (ID_ep: Number | undefined) => {
    const idValues = `${ID_ep}`;
    Cookies.set("ID_ep", idValues, { expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
    const id = Cookies.get("ID_ep");
    navigate("/Home/cartoon/episodes");
  };
  console.log(products);
  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 0px",
            color: "white",
            height:"84px",
            backgroundColor: "white",
          }}
        >
          <Topmenu />
        </Header>
        <Content
          style={{ padding: "10px 10px 10px 10px", height: "100vh" }}
          className="MainBackgroundColor"
        >
        <Layout className="MainBackgroundColor">
            <Header
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "18px 18px 0px 0px",
                padding: "0px 50px 0px 50px",
                backgroundColor: "#0C134F",
                color: "white",
                zIndex:"999"
              }}
            >
              <Menubookshelf/>
            </Header>
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "10px 20px 10px 10px",
                backgroundColor: "1818",
                background: "#181818",
                borderRadius:"0px 0px 18px 18px"
              }} className="Content-Content.Part"
            >
             
              <div className="header">การ์ตูนที่ซื้อแล้ว</div>
              {/* info-box1 start */}
              {products.map((cartoon)=>(
                <div className="info-box" onClick={() => onClick(cartoon.ID)}>
                  <div className="img-infobox">
                    <img  src={cartoon.Thumbnail} width={190} height={190} />
                  </div>
                  <div className="text-infobox">
                    <h1>{cartoon.Title}</h1>
                    <br></br>
                  </div>
                  <div className="EpisodeNumber-infobox">
                    <h1></h1>
                  </div>
                </div>
              ))}
              {/* info-box1 End */}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
export default Bookshelf_bought;

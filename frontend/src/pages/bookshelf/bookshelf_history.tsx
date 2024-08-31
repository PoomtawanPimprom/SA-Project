import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./style/bookshelf.css";
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom";
//component
import Topmenu from "../component/topmenu";
import Menubookshelf from "./component/menubookshelf";
//interface
import { UsersInterface } from "../../interfaces/IUser";
//https
import { GetUsersByUsernameAPI} from "../../services/https";
import { GetCartoonHistoryByID } from "../../services/https/Bookshelf/bookshelf_history";
const { Header,  Content } = Layout;

interface cartoon {
  ID:               number;
  Square_Thumbnail: string;
  Title:            string;
  Datetime:         string;
}
function Bookshelf_history() {
  const [member, setMember] = useState<UsersInterface | undefined>(undefined);
  const [products, setProducts] = useState<cartoon[]>([]);
  const username = Cookies.get('username');
  const navigate = useNavigate();

  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      setMember(res);
    }
  };

  const getCartoonHistoryByID = async (
    ID: Number | undefined
  ): Promise<any> => {
    let res = await GetCartoonHistoryByID(ID);
    if (res) {
      setProducts(res);
    }
  };
  const onClick = (ID: Number | undefined) => {
    const idValues = `${ID}`;
    Cookies.set("ID", idValues, { expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
    const id = Cookies.get("ID");
    console.log(id);
    navigate("/Home/cartoon");
  };

  useEffect(()=>{
    GetUsersByUsername();
  },[]);

  useEffect(() => {
    if (member?.ID) {
      getCartoonHistoryByID(member.ID);
    }
  }, [member]);


  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 0px",
            color: "white",
            height: "84px",
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
                zIndex: "999",
              }}
            >
              <Menubookshelf />
            </Header>
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "10px 20px 10px 10px",
                backgroundColor: "1818",
                background: "#181818",
                borderRadius: "0px 0px 18px 18px",
              }}
              className="Content-Content.Part"
            >
              <div className="header">ประวัติการอ่าน</div>
              {/* info-box1 start */}
              <div className="info-box-Area">
              {products.map((cartoon) => (
                <div className="info-box" onClick={() => onClick(cartoon.ID)}>
                  <div className="img-infobox">
                    <img src={cartoon.Square_Thumbnail} width={190} height={190} />
                  </div>
                  <div className="text-infobox">
                    <h1>{cartoon.Title}</h1>
                    <br></br>
                    <h3>สร้างเมื่อ : {dayjs(cartoon.Datetime).format("DD/MM/YYYY")}</h3>
                  </div>
                  <div className="EpisodeNumber-infobox">
                    <h1></h1>
                  </div>
                </div>
              ))}
              </div>

              {/* info-box1 End */}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
export default Bookshelf_history;

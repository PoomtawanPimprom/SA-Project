import React, { useState, useEffect } from "react";
import "../../index.css";
import "./styles/header1.css";
import "./styles/header1";
import { useNavigate } from "react-router-dom";
import { Layout, theme, ConfigProvider, Button } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { GetUsersByUsernameAPI } from "../../services/https";
import Cookies from "js-cookie"; //npm install js-cookie
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  userSelect: "none",
  height: "84px",
  alignItems: "center",
  borderBottom: "1px solid",
  borderBottomColor: "#0C134F",
  padding: "0px 0px 0px 10px",

};

function Topmenu() {
  const navigate = useNavigate();
  const homeButton = () => navigate("/Home");
  const bookshelf = () => navigate("/Bookshelf/Followed");
  const publish = () => navigate("/Publish");
  const buycoin = () => navigate("/Buycoin");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./styles/header";
    script.async = true;
    GetUsersByUsername();
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>("large");
  // const [users, setUsers] = useState<UsersInterface[]>([]);
  const username = Cookies.get("username");
  const [coin, setCoin] = useState<number | null>(null); // Initialize coin state
  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      const userCoin = res.Coins;
      setCoin(userCoin);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: "#0C134F",
          },
        },
        token: {
          colorText: "#FFFFFF",
          colorPrimary: "#5C469C",
        },
      }}
    >
      <Layout className="layout">
        <Header style={headerStyle}>
          <div className="header-left-side">
            <div className="satoon">
              <img
                className="satoon-img"
                src={require("./pictures/logo.png")}
              />
            </div>
            <div className="search-input-on-top">
              <form id="form-header" action="">
                <div className="search-input">
                  <input type="search" required className="input-search-bar" />
                  <i className="fa fa-search">
                    <img
                      className="search-icon"
                      src="https://img.icons8.com/ios-filled/50/search--v1.png"
                      alt="search--v1"
                    />
                  </i>
                </div>
              </form>
            </div>
           
            <div className='text-on-top' onClick={homeButton} >Home</div>
            
            
            <div className='text-on-top' onClick={bookshelf}>Bookshelf</div>
          </div>

          <div className="header-right-side">
            <div className="box">
              <div className="my-coin" onClick={buycoin}>
                <div className="overlap-group">
                  <p className="element">
                    <span className="text-wrapper">{coin}</span>
                    <span className="span"> 🪙</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="image">
              <img
                className="profile"
                alt="Profile"
                src={require("./pictures/profile.png")}
              />
            </div>
            <div className="button-on-top">
              <Button
                type="primary"
                shape="round"
                size={size}
                onClick={publish}
              >
                Publish
              </Button>
              <div className="box2">
                <div className="burger" onClick={() => navigate("/")}>
                  <div className="rectangle" />
                  <div className="div" />
                  <div className="rectangle-2" />
                </div>
              </div>
            </div>
          </div>
        </Header>
      </Layout>
    </ConfigProvider>
  );
}

export default Topmenu;

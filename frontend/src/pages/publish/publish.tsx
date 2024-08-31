import React, { useState, useEffect } from "react";
import Topmenu from "../component/topmenu";
import { Layout, theme, ConfigProvider, Button } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import "./styles/publish.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; //npm install js-cookie
import { GetUsersByUsernameAPI } from "../../services/https";
import { UsersInterface } from "../../interfaces/IUser";
import { GetCartoon } from "../../services/https/Publish/publish";
import dayjs from "dayjs";
interface Toon {
  ID: number;
  Square_Thumbnail: string;
  Title: string;
  CreatedAt: string;
}


function Publish() {
  const navigate = useNavigate();
  const publishSe = () => navigate("/Publish_Series");
  const publishEp = () => navigate("/Publish_Episodes");
  const [size, setSize] = useState<SizeType>("large");
  const [member, setMember] = useState<UsersInterface | undefined>(undefined);
  const [products, setProducts] = useState<Toon[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../styles/header";
    script.async = true;
    GetUsersByUsername();
  }, []);

  useEffect(() => {
    if (member?.ID) {
      Get_Cartoon(member.ID);
      
    }
  }, [member]);

  const onClick = (ID: Number | undefined) => {
    const idValues = `${ID}`;
    Cookies.set("ID", idValues, { expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
    const id = Cookies.get("ID");
    console.log(id);
    navigate("/Publish_Episodes");
  };

  const username = Cookies.get("username");

  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      setMember(res);
      
    }
  };
  const Get_Cartoon = async (ID: Number | undefined) => {
    let res = await GetCartoon(ID);
    if (res) {
      console.log(res);
      setProducts(res);
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
      <div>
        <Topmenu />
        <div className="Publish">
          <div className="Publish-flex-on-top">
            <div className="Publish-text-on-top">Choose Series</div>
            <div>
              <Button
                type="primary"
                style={{ backgroundColor: "#997FE1" }}
                shape="round"
                size={size}
                onClick={publishSe}
              >
                + Create Series
              </Button>
            </div>
          </div>
          <div className="Publish-flex-content">
            {products.map((t) => (
              <div className="Publish-series">
                <div className="Publish-set1">
                  <img
                    className="Publish-series-thumbnail-png"
                    src={t.Square_Thumbnail}
                    alt={`Thumbnail for ${t.Title}`}
                  />

                  <div className="Publish-text">
                    <div className="Publish-text-name">{t.Title}</div>
                    <div className="Publish-text-date">{dayjs(t.CreatedAt).format("DD/MM/YYYY-h:mm A")}</div>
                  </div>
                </div>
                <div className="Publish-button">
                  <Button
                    style={{ backgroundColor: "#997FE1" }}
                    type="primary"
                    shape="round"
                    size={size}
                    onClick={() => onClick(t.ID)}
                  >
                    + Create Episodes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
export default Publish;

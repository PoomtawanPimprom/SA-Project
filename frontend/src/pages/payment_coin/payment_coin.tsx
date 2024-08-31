import React, { useState, useEffect, } from 'react';
import '../../index.css';
import './styles/header.css';
import './styles/content.css';
import './styles/header';

import Topmenu from '../component/topmenu';
import { Layout, theme, ConfigProvider, Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import '../component/topmenu';

import { UsersInterface } from '../../interfaces/IUser';
import { GetUsersByUsernameAPI,} from "../../services/https";
import { PackageCoin,UpdateCoin } from '../../services/https/Payment_coin/payment_coin';
import Cookies from 'js-cookie'; //npm install js-cookie

/* Confirmation  */
import Swal from 'sweetalert2';
/*End Confirmation */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,


} from "react-router-dom";
import { count } from 'console';

const { Header } = Layout;

interface Product {
  ID: number;
  Price: number;
  Coin: number;
}



const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  userSelect: 'none',
  height: '84px',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderBottomColor: '#0C134F',
}


function Buycoin() {

  const [products, setProducts] = useState<Product[]>([]);
  const [member, setMember] = useState<UsersInterface | undefined>(undefined);
  const [coin, setCoin] = useState<number | null>(null); // Initialize coin state
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '../styles/header';
    script.async = true;
    GetUsersByUsername();
    packageCoin();
    
  },[]);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>('large');

  const handleClick = (p: Product) => {
    Swal.fire({
      title: 'คุณต้องการชำระเงิน?',
      text: `คุณต้องการจ่ายชำระจำนวน THB ${p.Price}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(member?.ID);
        console.log(p.ID);
        Updatecoin(member?.ID, p.ID);
        
        
        
        Swal.fire(
          'ชำระสำเร็จ!',
          `คุณได้รับ coin จำนวน ${p.Coin}`,
          'success'
          
        )
        
        setTimeout(() => window.location.reload(), 800);
        }
    })
  }

  const username = Cookies.get('username');
  
  const GetUsersByUsername = async () => {
    let res = await GetUsersByUsernameAPI(username);
    if (res) {
      
      setMember(res);
      const userCoin = res.Coins;
      setCoin(userCoin);
    }
  };
  const packageCoin = async () => {

    let res = await PackageCoin();
    if(res){
      console.log(res)
      setProducts(res)
    }
  };

  const Updatecoin= async (ID: Number | undefined, ID_package: Number) => {
    if (ID !== undefined && ID_package !== undefined) {
      let res = await UpdateCoin(ID, ID_package);
      if(res){
        console.log(res)
    }
  }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: "#0C134F",
          }
        },
        token: {
          "colorText": "#FFFFFF",
          "colorPrimary": "#5C469C",

        },
      }}>

      <Layout className="layout">

        <Header style={headerStyle}>
          <Topmenu />

        </Header>
        <div id="grad1">
          <div className='box3-4'>
            <div className="box3">
              <div className="group">
                <div className="overlap">
                  <div className="overlap-group">
                    <div className="text-wrapper">เหรียญของฉัน</div>
                    <div className="my-coin">
                      <div className="div-wrapper">
                        <div className="div">{coin}</div>
                      </div>
                    </div>
                  </div>
                  <img className="image" alt="Image" src={require("./pictures/image-4.png")} />
                </div>
              </div>
            </div>
            <div className="box4">
              <div className='box4-content'>
                {products.map((p) => (
                  <div onClick={() => handleClick(p)} className='box4-flex' >
                    <div className="box">
                      <div className="group">
                        <div className="overlap-group">
                          <div className="rectangle"><div className='box4-text'>THB {p.Price}</div></div>
                          <div className="overlap">
                            <div className="text-wrapper">{p.Coin}</div>
                            <img className="image" alt="Image" src={require("./pictures/image-4.png")} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='satoon-footer'>
              <img className='satoon-img2' src={require("./pictures/logo.png")} />
            </div>
          </div>
        </div>

      </Layout>

    </ConfigProvider>

  );
}

export default Buycoin;

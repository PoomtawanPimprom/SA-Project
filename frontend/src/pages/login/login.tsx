import React, { useState, useEffect } from 'react';
import './styles/login.css';
import { Layout, theme, ConfigProvider, Button, Form, Input, message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useNavigate } from "react-router-dom";

import { UsersInterface } from '../../interfaces/IUser';
import { LoginByUsername } from '../../services/https/Login/login';
import Cookies from 'js-cookie'; //npm install js-cookie

function Login() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>('large');

  const navigate = useNavigate();
  const signupButton = () => navigate('/Register');
  const buycoinButton = () => navigate('/Buycoin');

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    let res = await LoginByUsername(values);
    console.log(values.Username)
    console.log(res.status)
    
    if (res.status) {
      const usernameValues = values.Username as string;
      Cookies.set('username',usernameValues,{ expires: 7 }); //setCookie(name, value, {วันหมดอายุ})
      const username = Cookies.get('username');
      console.log('Cookies : '+username)
      messageApi.open({
        type: "success",
        content: <span style={{ color: 'green' }}>
        เข้าสู่ระบบสำเร็จ
      </span>,
      });

      setTimeout(function () {
        navigate("/Home");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: <span style={{ color: 'red' }}>
          ข้อมูลไม่ถูกต้อง
          </span>,
      });
    }
  };

  return (
    <ConfigProvider
      theme={{

        token: {
          "colorText": "#000000",
          "colorPrimary": "#525252",

        },
      }}>

      <div id='grad2'>
        <div className='page'>
          <div className="box-login">
            <div className="group">
              <img className='satoon-img-login' src={require("./pictures/logo.png")} />
              <div className="text-login">Login</div>
              <Form
                id='login'
                form={form}
                name="login"
                onFinish={onFinish}
                autoComplete='off'
                style={{ maxWidth: 500 }}

              >
                <Form.Item
                  name="Username"

                  rules={[{ required: true, message: 'Please input your Username!', whitespace: true }]}
                >
                  <Input className="type-1-register1" placeholder="USER NAME" />
                </Form.Item>
                <Form.Item
                  name="Password"
                 
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password  className="type-1-register" placeholder="PASSWORD" />
                </Form.Item>
                <div className='button-login'>
                  <Button className="button-login-1" type="primary" shape="round" onClick={signupButton} >
                    Sign Up
                  </Button>
                  {contextHolder}
                  {/* <span className='enter-login' onClick={loginButton}>&#8594;</span > */}
                  <Button className='button-login-1' type="primary" htmlType="submit" shape="round" style={{backgroundColor:'#5ECC8A'}}>
                    Login
                  </Button>
                </div>
              </Form>
              

              {/* <input type="text" className="type-1-login" placeholder="USER NAME" />
              <input type="text" className="type-1-login" placeholder="PASSWORD" /> */}
              {/* <div className='button-login'>
                <Button className="button-signup" type="primary" shape="round" onClick={signupButton} >
                  Sign up
                </Button>
                <span className='enter-login' onClick={buycoinButton} >&#8594;</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>

  );

}



export default Login;
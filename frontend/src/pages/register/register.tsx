import React, { useState, useEffect } from 'react';
import './styles/register.css';
import { Layout, theme, ConfigProvider, Button, Form, Input,message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useNavigate } from "react-router-dom";

import { UsersInterface } from '../../interfaces/IUser';
import { CreateMember } from '../../services/https/Register/register';

function Register() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>('large');

  const navigate = useNavigate();
  const loginButton = () => navigate('/');

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  // };

  const onFinish = async (values: UsersInterface) => {
    let res = await CreateMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: <span style={{ color: 'green' }}>
        บันทึกข้อมูลสำเร็จ
      </span>,
      });
      setTimeout(function () {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content:  <span style={{ color: 'red' }}>
        บันทึกข้อมูลไม่สำเร็จ
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
              <div className="text-register">Register</div>
              <Form 
                id='register'
                form={form}
                name="register"
                onFinish={onFinish}
                autoComplete='off'
                style={{ maxWidth: 500 }}
              >
                <Form.Item
                  name="Username"
                 
                  rules={[{ required: true, message: 'Please input your Username!', whitespace: true }]}
                >
                  <Input className="type-1-register1" placeholder="USERNAME" />
                </Form.Item>
                {/* <input type="text" className="type-1-login" placeholder="USER NAME" />
                <input type="text" className="type-1-login" placeholder="EMAIL" /> */}
                <Form.Item
                  name="Email"
                 
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input className="type-1-register1" placeholder="EMAIL" />
                </Form.Item>
                {/* <input type="text" className="type-1-login" placeholder="PASSWORD" />
                <input type="text" className="type-1-login" placeholder="CONFIRM PASSWORD" />
                 */}
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

                <Form.Item
                  name="confirm"
               
                  dependencies={['Password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your Password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('Password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password className="type-1-register" placeholder="CONFIRM PASSWORD" />
                </Form.Item>
                <div className='button-login'>
                  <Button className="button-login-1" type="primary" shape="round" onClick={loginButton} >
                    Login
                  </Button>
                  {/* <span className='enter-login' onClick={loginButton}>&#8594;</span > */}
                  {contextHolder}
                  <Button className='button-login-1' type="primary" htmlType="submit" shape="round" style={{backgroundColor:'#5ECC8A'}}>
                    Register
                  </Button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
export default Register;
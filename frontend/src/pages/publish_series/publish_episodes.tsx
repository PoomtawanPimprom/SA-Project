import React, { useState, useEffect } from 'react'
import Topmenu from '../component/topmenu'
import { ColorPicker, Layout } from 'antd'
import { Steps } from 'antd'
import { ConfigProvider, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import './style/publish_episodes.css'
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import { InputNumber } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { EpisodesInterface } from '../../interfaces/IEpisodes'
import {  GetCartoonByID_API,GetUsersByUsernameAPI } from '../../services/https'
import { GetCartoon,CreateEpisodes } from '../../services/https/Publish/publish'

import Cookies from 'js-cookie';
import { SeriesInterface } from '../../interfaces/ISeries'
import Title from 'antd/es/skeleton/Title'
import { UsersInterface } from '../../interfaces/IUser'

const { Header, Content, Sider } = Layout;


const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    userSelect: 'none',
    height: '84px',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderBottomColor: '#0C134F',
    padding: '0px',
}

const getBase64 = (file1: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file1);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const getBase641 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

    


function Publish_Episodes() {
    const [member, setMember] = useState<UsersInterface| undefined>(undefined);
    const [title, setTitle] = useState<string|null>(null);
    const [cartoons, setCartoons] = useState<SeriesInterface | undefined>(undefined);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '../styles/header';
        script.async = true;
        GetCartoonByID();
        GetUsersByUsername();
          
      
        
    }, []);

    useEffect(() => {
        if (member?.ID) {
          Get_Cartoon(member.ID);
        }
      }, [member]);

    useEffect(() => {
        console.log(title)
    }, [title]);

    const [current, setCurrent] = useState(1);
    const onChange = (value: number) => {
        navigate('/Publish_Se')
        console.log('onChange:', value);
        setCurrent(value);
    };
    const navigate = useNavigate();



    //======================================================================================================================================================================
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined className='text-btn-upload-square' />
            <div className='text-btn-upload-square' style={{ marginTop: 10 }}>select an image to upload</div>
        </div>);

    //======================================================================================================================================================================
    
    
    const username = Cookies.get('username');
  
    const GetUsersByUsername = async () => {
      let res = await GetUsersByUsernameAPI(username);
      if (res) {
        
        setMember(res);
        
        
      }
    };


    const id = Cookies.get('ID');
    console.log(id)
    
    const GetCartoonByID = async () => {
        let res = await GetCartoonByID_API(id);
        if (res) {
            console.log(res)
            setCartoons(res);
            const titles = res.Title
            setTitle(titles)
            console.log(titles)
           
        }
    };

    const Get_Cartoon = async (ID: Number | undefined) => {
        let res = await GetCartoon(ID);
        if(res){
          console.log(res)
          
        }
      };
    


    const [messageApi,contextHolder] = message.useMessage();
    const onFinish = async (values: EpisodesInterface) => {
        const picturesString = values.pictures.fileList.map((file: any) => file.thumbUrl).join(',');

        // Create an updated values object
        const updatedValues = {
            ...values,
            pictures: picturesString,
            thumbnail: values.thumbnail.file.thumbUrl,
        };

        console.log(updatedValues)
        let res = await CreateEpisodes(cartoons?.ID, updatedValues);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: <span style={{ color: 'green' }}>
                    บันทึกข้อมูลสำเร็จ
                </span>,
            });
            setTimeout(function () {
                navigate('/Home')
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: <span style={{ color: 'red' }}>
                    บันทึกข้อมูลไม่สำเร็จ
                </span>,
            });
            setTimeout(() => window.location.reload(), 800);
        }
    };




    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '5C469C',

                },
                components: {
                    Upload: {
                        actionsColor: 'white',
                        colorBorder: 'white',
                        colorPrimary: 'black',
                        controlHeightLG: 70,
                    },
                    Form: {
                        labelColor: 'white',
                        labelFontSize: 24,

                    },


                },
            }}
        >
            <Layout >
                <Header style={headerStyle}>  <Topmenu /></Header>
                <Content
                    style={{ padding: '0px 0px 0px 0px', height: '100%' }} >
                    <Layout style={{ padding: '0px 0px 0px 0px', height: '100%' }} >
                        <Header style={{ backgroundColor: 'transparent' }}>
                            <Steps
                                type="navigation"
                                current={current}
                                
                                className="site-navigation-steps"
                                items={[
                                    {
                                        status: current === 0 ? 'process' : 'finish', // เปลี่ยน status เป็น 'process' หรือ 'finish' ตามที่ถูกคลิก
                                        title: 'Series',
                                    },
                                    {
                                        status: current === 1 ? 'process' : current > 1 ? 'finish' : 'wait', // เปลี่ยน status เป็น 'process', 'finish', หรือ 'wait' ตามที่ถูกคลิก
                                        title: 'Episode',

                                    },
                                ]}
                            /> </Header>
                        <Layout className='background'>
                            <Form layout='vertical' onFinish={onFinish}>
                                <Sider width={500} style={{ backgroundColor: 'transparent' }}>
                                    <p className='text-Upload-Series'>Upload Your Episode</p>
                                    <Form.Item >
                                        <p className='text-Square'>Thumbnail</p>
                                        <div className='bg_btn_thumbnail'>
                                            <Form.Item name='thumbnail'>
                                                <Upload

                                                    className='btn_upload_square'
                                                    action="http://localhost:3000/Publish_Ep"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onPreview={handlePreview}
                                                    onChange={handleChange}
                                                >
                                                    {fileList.length >= 1 ? null : uploadButton}
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </Form.Item>
                                </Sider>

                                <Content style={{ width: '50vw', marginTop: '-20px' }} className='bg-from' >
                                    <Form.Item style={{ paddingLeft: '60px', marginTop: '0px', backgroundColor: 'transparent', borderColor: 'transparent', fontSize: '40px', color: 'white' }}
                                    > 
                                     
                                        <Form layout='horizontal'  >
                                            <Space>
                                                <p style={{ paddingLeft: '0px', position: 'relative', left: '-30px', color: 'white', fontSize: '24px' }}>Title : {title} </p>
                                            </Space>
                                        </Form>
                                     
                                        <Space>
                                            <Form.Item label="Episode Name" name='epnumber' >
                                                <InputNumber min={0} max={1000} style={{ width: '50px', height: '32px', marginRight: '8px', color: 'black' }} />
                                                
                                            </Form.Item>
                                            <Form.Item style={{ paddingTop: '45px', marginLeft: '-100px' }} name='title'>
                                                <Input style={{ width: '500px', height: '32px', marginRight: '8px', color: 'black' }} name='title' />
                                            </Form.Item>
                                            <Form.Item label="Price" name='price' >
                                        <InputNumber step={10} min={10} max={100} style={{ width: '70px', height: '32px', marginRight: '8px', color: 'black' }} />
                                        </Form.Item>
                                        </Space>
                                        
                                        <p style={{ fontSize: '24px' }}>Upload file</p>
                                        <Form.Item name='pictures'  >
                                            <Upload
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                listType="picture"
                                                defaultFileList={[...fileList]}
                                            >
                                                <Button >Upload</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Form.Item>
                                </Content>
                                {contextHolder}
                                <Button type="primary" htmlType="submit" style={{ marginLeft: '1240px', marginTop: '570px', borderRadius: '20px', width: '120px', height: '40px' }}>
                                    Create Episode
                                </Button>
                            </Form>
                        </Layout>
                    </Layout>
                </Content>
            </Layout>
        </ConfigProvider>

    )
}

export default Publish_Episodes
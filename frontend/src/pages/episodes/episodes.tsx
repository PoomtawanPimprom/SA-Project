import React, { useState, useEffect } from 'react'
import { Layout } from "antd";
import Swal from 'sweetalert2';
import Topmenu from "../component/topmenu";
import './style/episodes.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { GetCartoonByID_API, GetEpisodesByID_API, GetUsersByUsernameAPI, getPayment ,UpdatePaymentEp, GetChapterByID_API} from '../../services/https';
import { UsersInterface } from '../../interfaces/IUser';
//import Menubookshelf from "./component/menubookshelf";
const { Header, Content } = Layout;
interface Toon {
    ID: number;
    Epnumber: number;
    Thumbnail: string;
    Title: string;
    Price: string;
    Datetime: string;
    Pictures: string;
}
function Episodes() {

    const [products, setProducts] = useState<Toon[]>([]);


    const navigate = useNavigate();
    


    useEffect(() => {
        const script = document.createElement('script');
        script.src = '../styles/header';
        script.async = true;
        GetChapterByID(id);
       

    }, []);

    const id = Cookies.get('ID_ep');
    console.log(id)





    const GetChapterByID = async (ID: string | undefined) => {
        try {
            let res = await GetChapterByID_API(ID);
            console.log(res);
            setProducts(res);
        } catch (error) {
            console.error('Error fetching chapter by ID:', error);
        }
    };






    return(
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


        {products.map((p) => (

        <div className="bd1">
            <div className="toon"> <img  src={p.Pictures} /></div>
        </div>

        ))}

        <div className="movingpage">
            <div className="sub1movingpage">
                <a href="http://youtube.com" style={{textDecoration:'none'}}>
                    <div className="prevbt">
                        <h1 className="prev"> {'<'}</h1>
                    </div>
                </a>
                <div className="padinpage">

                    <div className="pages">
                        <div className="nump">
                            <h2 className="n">1666</h2>
                        </div>
                        <div className="jumpbox">
                            <div className="jump">
                                <span className="jumpto" onClick={() => navigate("/Home/cartoon/episodes/comment")}>jump to...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="http://youtube.com" style={{textDecoration:'none'}}>
                    <div className="nextbt">
                        <h1 className="next"> {'>'} </h1>
                    </div>
                </a>
            </div>
        </div>


     
        
        </Layout>
        </>
    )
}
export default Episodes
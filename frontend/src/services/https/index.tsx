import { SeriesInterface } from "../../interfaces/ISeries";
import { UsersInterface } from "../../interfaces/IUser";
import { CommentInterface } from "../../interfaces/IComment";
import { EpisodesInterface } from "../../interfaces/IEpisodes";

const apiUrl = "http://localhost:8080";

//For All page
async function GetUsersByUsernameAPI(username: string | undefined) {
  const requestOptions = {
    method: "GET",
    
  };
  let res = await fetch(`${apiUrl}/login/${username}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetInfoMemberByMemberID(ID: Number | undefined) {
  const requestOptions = {
    method: "GET",
    
  };
  let res = await fetch(`${apiUrl}/member/${ID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}







//Page.Cartoon ยังไม่จัด
async function GetCartoonByID_API(ID: string | undefined) {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/cartoon/${ID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}
async function GetEpisodesByID_API(ID: string | undefined) {
  const requestOptions = {
    method: "GET",
    
  };
  let res = await fetch(`${apiUrl}/episodes/${ID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetChapterByID_API(ID: string | undefined) {
  const requestOptions = {
    method: "GET",
    
  };
  let res = await fetch(`${apiUrl}/episode/${ID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}
async function getPayment(ID_E: number | undefined,member_ID: Number | undefined):Promise<any> {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/paymentEP/${member_ID}/${ID_E}`, requestOptions)
  .then((response) => response.json())
  .then((res) =>{
    if(res.data){
      return { status: 1, message: res.data };

    }else{
      return { status: 0, message: res.error };
    }

  });
  return res;
}
//Page.Bought Episodes
async function UpdatePaymentEp(ID_E: number | undefined,member_ID: Number | undefined):Promise<any> {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/PaymentEP/${member_ID}/${ID_E}`, requestOptions)
  .then((response) => response.json())
  .then((res) =>{
    if(res.data){
      return res.data;

    }else{
      return false;
    }

  });
  return res;
}

//Page.dashboard
async function GetCartoonToDashboard() {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/home`, requestOptions)
  .then((response) => response.json())
  .then((res) =>{
    if(res.data){
      return res.data;

    }else{
      return false;
    }

  });
  return res;
}












export {
  //All Page
    GetUsersByUsernameAPI,
    GetInfoMemberByMemberID,
  //register
    // CreateMember,

  //login
    // LoginByUsername,

  //payment_Coin
    // PackageCoin,
    // UpdateCoin,

  //publish_series
    // CreateSeries,
    // GetCartoon,
    GetCartoonByID_API,
    // GetCategories,
    
    // CreateEpisodes,
  //Comment
    // CreateComment,
    
  //bookshelf/follow
    //GetCartoonByID,

    GetCartoonToDashboard,
    GetEpisodesByID_API,
    getPayment,
    UpdatePaymentEp,
    GetChapterByID_API,
    
};
import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { FollowInterface } from "../../../interfaces/IFollow";
const apiUrl = "http://localhost:8080";

// /bookshelf/history
async function GetCartoonHistoryByID(ID: Number | undefined):Promise<any> {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/bookshelf/history/${ID}`, requestOptions)
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

async function CreateHistory(member_ID: Number | undefined, ID_C: number | undefined):Promise<any> {
    const requestOptions ={
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/bookshelf/history/${member_ID}/${ID_C}`, requestOptions)
    .then((response) => response.json())
    .then((res) =>{
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
    return res;
}

export{
    CreateHistory,
    GetCartoonHistoryByID,
}
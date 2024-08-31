import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { CommentInterface } from "../../../interfaces/IComment";
import { EpisodesInterface } from "../../../interfaces/IEpisodes";
import { FollowInterface } from "../../../interfaces/IFollow";
const apiUrl = "http://localhost:8080";
// /bookshelf/follow
async function GetCartoonFollowByID(ID: Number | undefined):Promise<any> {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/bookshelf/follow/${ID}`, requestOptions)
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

async function CreateFollow(member_ID: Number | undefined,ID_C: number | undefined):Promise<any> {
    const requestOptions ={
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/bookshelf/follows/${member_ID}/${ID_C}`, requestOptions)
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

async function DeleteFollow(memberID: Number | undefined,cartoonID: number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };
  let res = await fetch(`${apiUrl}/bookshelf/follows/${memberID}/${cartoonID}`, requestOptions)
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
async function CheckCartoonFollowByID(member_ID: Number | undefined,ID_C: Number| undefined):Promise<any> {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/bookshelf/followsCheck/${member_ID}/${ID_C}`, requestOptions)
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
export{
    DeleteFollow,
    CreateFollow,
    GetCartoonFollowByID,
    CheckCartoonFollowByID,
}




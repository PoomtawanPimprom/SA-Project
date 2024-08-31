import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { CommentInterface } from "../../../interfaces/IComment";
import { EpisodesInterface } from "../../../interfaces/IEpisodes";
import { RatingInterface } from "../../../interfaces/IRating";
const apiUrl = "http://localhost:8080";

async function CreateRating(mem4RatingID: Number | undefined,toon4RatingID: number | undefined):Promise<any> {
    const requestOptions ={
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/cartoon/ratings/${mem4RatingID}/${toon4RatingID}`, requestOptions)
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

    async function CheckCartoonRatingByID(mem4RatingID: Number | undefined,ID_C: Number| undefined):Promise<any> {
      const requestOptions ={
        medthod: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res = await fetch(`${apiUrl}/cartoon/ratingCheck/${mem4RatingID}/${ID_C}`, requestOptions)
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

    async function DeleteRating(mem4RatingID: Number | undefined,toon4RatingID: number | undefined) {
      const requestOptions = {
        method: "DELETE"
      };
      let res = await fetch(`${apiUrl}/cartoon/ratingDEL/${mem4RatingID}/${toon4RatingID}`, requestOptions)
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


  async function GetCartoonRating1stID() {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/cartoon/rating`, requestOptions)
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

async function GetCartoonRating2ndID() {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/cartoon/ratings2nd`, requestOptions)
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


async function GetCartoonRating3thID() {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/cartoon/ratings3th`, requestOptions)
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
  
    CreateRating,
    CheckCartoonRatingByID,
    DeleteRating,
  
    GetCartoonRating1stID,
    GetCartoonRating2ndID,
    GetCartoonRating3thID,
  }
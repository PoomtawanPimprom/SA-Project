import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { CommentInterface } from "../../../interfaces/IComment";
import { EpisodesInterface } from "../../../interfaces/IEpisodes";

const apiUrl = "http://localhost:8080";

async function CreateSeries(ID: Number | undefined,categoriesID: number | undefined,data: SeriesInterface):Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/cartoons/${ID}/${categoriesID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }
  
  
  
  async function GetCartoon(ID: Number | undefined):Promise<any> {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/cartoons/${ID}`, requestOptions)
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
  async function GetCategories() {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/categories`, requestOptions)
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
  //Page publish/Episodes
  async function CreateEpisodes(ID: Number | undefined,data: EpisodesInterface):Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/episodes/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }
export{
    CreateSeries,
    GetCartoon,
    GetCategories,
    //Page publish/Episodes
    CreateEpisodes,
}
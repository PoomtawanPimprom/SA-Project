import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { CommentInterface } from "../../../interfaces/IComment";
import { EpisodesInterface } from "../../../interfaces/IEpisodes";

const apiUrl = "http://localhost:8080";
//Page Payment_coin
async function PackageCoin() {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/package`, requestOptions)
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
  
  async function UpdateCoin(ID: Number | undefined, ID_package: Number | undefined):Promise<any> {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/package/${ID}/${ID_package}`, requestOptions)
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
    PackageCoin,
    UpdateCoin,
}

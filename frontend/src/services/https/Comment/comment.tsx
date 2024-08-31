import { SeriesInterface } from "../../../interfaces/ISeries";
import { UsersInterface } from "../../../interfaces/IUser";
import { CommentInterface } from "../../../interfaces/IComment";
import { EpisodesInterface } from "../../../interfaces/IEpisodes";

const apiUrl = "http://localhost:8080";
//Page comment
async function CreateComment(ID: Number | undefined,IDep : string | undefined,data: CommentInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/comments/${ID}/${IDep}`, requestOptions)
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
  async function GetComment(ID: string | undefined) {
    const requestOptions ={
      medthod: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/comments/${ID}`, requestOptions)
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
  
  
  async function GetUsernameByMemberID(memberID: number | undefined): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(`${apiUrl}/members`, requestOptions);
  
      if (!response.ok) {
        console.error("Error getting username by member ID");
        return null;
      }
  
      const data = await response.json();
       console.log(data);
      if (data && data.data) {
        return data.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error getting username by member ID: " + error);
      return null;
    }
  }
export{
    CreateComment,
    GetComment,
    GetUsernameByMemberID
}
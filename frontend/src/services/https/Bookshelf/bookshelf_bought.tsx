const apiUrl = "http://localhost:8080";

async function GetCartoonPaymentEpisodesByID(ID: Number | undefined):Promise<any> {
  const requestOptions ={
    medthod: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/bookshelf/paymentEpisodes/${ID}`, requestOptions)
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
  GetCartoonPaymentEpisodesByID,
}
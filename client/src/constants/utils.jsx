export const convertCreatedTime=(time)=>{
let Hours=new Date(time).getHours();
let Mins=new Date(time).getMinutes();
return `${Hours < 10 ? '0'+Hours :Hours}:${Mins<10?'0'+Mins:Mins}`

}
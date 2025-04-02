export const randomGen =(len:number)=>{
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let res=""
    for(let i =0;i<len;i++){
        res+=options[Math.floor((Math.random())*len)]
    }
    return res
}
const axios = require('axios');

module.exports.getEndIndex = function(tickets,id,num){
    if(num==0)
        return tickets.length<parseInt(id)+25?tickets.length:parseInt(id)+25;
    else{
        return 25>tickets.length?tickets.length:25;
    }
}
module.exports.getHasNext = function(endIndex,tickets,num){
    if(num==0)
        return endIndex < tickets.length?true:false;
    return 25 < tickets.length?true:false;
}
module.exports.getTickets = async (url,auth)=>{
    return axios.get(url,{
    "headers":{
        'Authorization': auth,
    }
})
}
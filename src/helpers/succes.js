const succes={};
var total_succes=[];
succes.succesFull=(mensaje)=>{
  total_succes.push(mensaje);
}
succes.getSucces=()=>{
  return total_succes;
}
successCtrl.deleteSucces=()=>{
  total_succes=[];
}

module.exports=succes;

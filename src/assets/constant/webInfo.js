const webInfo = {
    webAddress :'lyquochai',
    status:'inactive',
    // mainColor: {  r: '250', g: '140', b: '22',  a: '1', hex:'#fa8c16'} ,
    mainColor: {  r: '242', g: '165', b: '174',  a: '1', hex:'#f2a5ae'},  
    bgColor:{r: '255', g: '255', b: '255',  a: '1',hex:'#ffffff'},
    navBar:{
      buttonLogin: "1" ,  // 0: nut, 1:icon
      buttonCart:"0" , //0: special, 1: normal
      navColor : "1", //0:white, 1- maincolor
      textNav : ["1",17, 600],  //0-left 1-right //color: black-white-grey-maincolor, size: small - large(16):,  bold:no() -yes (600)
    },
    listProduct:{
      priceStyle :["0", 18, 600],//0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600)
      nameStyle: ["0", 19, 300],//0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600), maxNumberOFline: 1-2
      btnStyle:["0", "0"], //0-left 1-right //haveBtn: yes-no, style:circle - box
      isBox:false,
      isMargin:true,
      border:true,
      alignCenter:false,
      marginContainer:0,
      boxDistance:1,
      // marginContainer:10,
      // boxDistance:2,
    }   
}
export default webInfo
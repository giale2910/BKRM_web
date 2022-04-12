import React, {useState,useEffect} from 'react'
import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import { grey, blue,purple} from '@material-ui/core/colors'
import ReactApexChart from 'react-apexcharts';

import {Typography,Divider,Card,Grid,Paper,InputAdornment,Box,TextField,Button,InputLabel,MenuItem,FormControl,Select,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import ava from '../../../../assets/img/product/lyimg.jpeg';
import DayReportSelect from "../../../../components/Select/DayReportSelect"
import BranchSelect from "../../../../components/Select/BranchSelect"
import TopSelect from "../../../../components/Select/TopSelect"
import TypeReportSelect from "../../../../components/Select/TypeReportSelect"
import ReportCard from "../../../../components/CardWrapper/ReportCard"
import storeApi from "../../../../api/storeApi";
import defaultProduct from "../../../../assets/img/product/default-product.png"

import { useSelector } from 'react-redux'
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import barcodeIcon from "../../../../assets/img/icon/barcode_grey.png";
import { TreeSelect } from 'antd';
import productApi from "../../../../api/productApi";


const EmployeeStatistics = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;
    const branches = info.store.branches 

  // category id to view to item by root category
  // should be selected by a drop down and pass as category_id=> category uuid đc ko
  
  const [topData, setTopData] = useState({})
 
  const fetchTopData = async () =>{
    const topDataRes = await storeApi.getReportTop( store_uuid,  dayQuery.fromDate, dayQuery.toDate );
    setTopData(topDataRes)
  }
   // 
   const today = new Date()
   const [dayQuery,setDayQuery] = useState({
     fromDate: new Date(today.setDate(today.getDate() - 7 +1)).toISOString().split('T')[0],
     toDate: new Date().toISOString().split('T')[0],
   });

   const [selectedBranches, setSelectedBranches] = useState(branches?branches:[]);
   const [limit, setLimit] = useState(10);
  //  const handleChangeLimit =  (event) => {
  //    const { name,value } = event.target;
  //    setLimit((prevState) => { return { ...prevState, [name]: value, };
  //   })};
   //

  useEffect(() => {
      if (store_uuid && branch_uuid ) {
        fetchTopData()
      }   
  }, [])
    useEffect(() => {
      if (store_uuid && branch_uuid ) {
        fetchTopData()
        }   
  }, [store_uuid,dayQuery])

    let topSortedRevenue = topData?.top_product ? [...topData?.top_product] :[]
    topSortedRevenue.sort((a, b) => b.total_sell_price - a.total_sell_price ) 

    let topProfit = topData?.top_product ? [...topData?.top_product] :[]
    topProfit.sort((a, b) => b.total_sell_price - a.total_sell_price ) 

    let topBestSeller = topData?.top_product ? [...topData?.top_product] :[]
    topBestSeller.sort((a, b) => b.total_quantity - a.total_quantity ) 

    console.log("topData",topData)

    var dataRevenue= {   
      series: [{
        name: 'Tổng doanh thu',
        data: topSortedRevenue ? topSortedRevenue.map((item) =>item.total_sell_price).slice(0, limit) :[],
      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories:  topSortedRevenue ? topSortedRevenue.map((item) =>item.name).slice(0, limit) :[],
        }
      }
    };

    //          
    var dataProfit= {   
      series: [{
        name: 'Tổng lợi nhuận',
        data: topData?.top_product ? topData?.top_product.map((item) =>item.total_quantity).slice(0, limit) :[]
      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories:   topData?.top_product ? topData?.top_product.map((item) =>item.name).slice(0, limit) :[],
        }
      },
    };
           

    var dataBestSeller= {   
      series: [{
        name: 'Số lượng đơn',
        data: topBestSeller ? topBestSeller.map((item) =>item.total_quantity).slice(0, limit) :[]

      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories: topBestSeller ? topBestSeller.map((item) =>item.name).slice(0, limit) :[],
        }
      },
      
    };

    const [type, setType] =  useState('revenue')    
    const returnData = () =>{
      if(type.includes("best-seller")){ return dataBestSeller }
      else if (type.includes("revenue")) {  return dataRevenue}
      else{ return dataProfit  }
    }
    const getTitle = () =>{
      if(type.includes("best-seller")){ return title[0] }
      else if (type.includes("revenue")) {  return title[1]}
      else{ return title[2]  }
    }

  return (
    <Card className={classes.root}>
    {/* 1. */}
    <ReportCard  title={"Báo cáo nhân viên"} 
    ToolBar={
      <ListItem  style={{margin:0, padding:0}}>
        {branches?.length === 1?null: <BranchSelect selectedBranches={selectedBranches} setSelectedBranches={setSelectedBranches}/>}
        <DayReportSelect dayQuery={dayQuery} setDayQuery={setDayQuery}/>
      </ListItem>
      }
    />
    
    <ReportCard 
    //  title={`Top ${limit}  theo ${getTitle()}`} 
    typeTitle={getTitle()}
      limitTitle={`Top ${limit} nhân viên `}
     ToolBar={
       <>
        <TopSelect name="bestSeller" handleChangeLimit={(e)=>setLimit(e.target.value)} limit={limit}/>
        <TypeReportSelect  type={type} handleChangeType={(e)=> setType(e.target.value)} title={title}/>
     </>
     }
      > 
        <ReactApexChart options={returnData().options} series={returnData().series} type="bar" height={350} />
    </ReportCard> 

    <DetailStatistic data={topData.top_product}/>
    

</Card>
  )

}
export default EmployeeStatistics
const title = [" số đơn hàng", " doanh thu"," lợi nhuận" ]


const DetailStatistic= (props) =>{

  const {data} = props
  const theme = useTheme();
  const classes = useStyles(theme);
  const [productData , setProductData] = useState(data? data:[])

  useEffect(() => {
    setProductData(data)
}, [data])

  function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  const [type,setType] = useState("revenue")

  const handleChangeType = (e)  =>{
    setType(e.target.value)
    console.log("e.target.value",e.target.value)
    if(e.target.value.includes("best-seller")){
      setProductData( productData.sort((a, b) => b.total_quantity - a.total_quantity ) )
    }else if (e.target.value.includes("revenue")) {
      setProductData( productData.sort((a, b) => b.total_sell_price - a.total_sell_price ) )
    }else{
      setProductData( productData.sort((a, b) => b.total_sell_price - a.total_sell_price ) )
    }
  }
  return(
    <ReportCard  title={`Báo cáo chi tiết`}  
        ToolBar={
          <ListItem style={{padding:0, margin:0}}>
          <TypeReportSelect  type={type} handleChangeType={handleChangeType} title={title} label="Sắp xếp theo"/>
          
          <TextField  style={{  marginLeft: 10 }}  variant="outlined"    placeholder={"Tìm khách hàng..."} 
              InputProps={{ 
                startAdornment: (  <InputAdornment position="start">  <SearchTwoToneIcon className={classes.icon} /> </InputAdornment> ),
                endAdornment: (<InputAdornment position="end">  <Box   component="img"    sx={{ height: 23, width: 23 }}  src={barcodeIcon} />  </InputAdornment> ),
                className: classes.search,
              }}
              onChange={(e)=>{
                console.log('e')
                if(e.target.value.length === 0 ) { setProductData(data)}
                else{
                  let newProductData = productData.length !== 0 ?[...data]:[]
                  newProductData = newProductData.filter(item  => removeAccents(item.name.toUpperCase()).includes(removeAccents(e.target.value).toUpperCase()))
                  setProductData(newProductData)
                }
              }}
          
            />
            </ListItem>
        } > 
        <Grid container justifyContent='space-between' alignItems='center'  >
            <Grid item xs={4}><Typography style={{color:"#000",fontSize:17,fontWeight:500,}}>Nhân viên</Typography></Grid>
            <Grid item xs={2}><Typography style={{ color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>SL đơn</Typography></Grid>
            <Grid item xs={2}><Typography style={{color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>Tổng thu</Typography></Grid>
            <Grid item xs={2}><Typography style={{color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>Tổng lợi nhuận</Typography></Grid>
        </Grid>

        <Divider style={{marginTop:15, marginBottom:10}} />
        {productData?.map((item)=>{
            return(
            <Box key={item.uuid}style={{marginBottom:10}}>
            <Grid container justifyContent='space-between' alignItems='center' style={{marginBottom:10}} >
               <Grid item xs={4}>
                  <Box style={{}}>
                      <ListItem style={{ margin:0, padding:0 }}  >
                          <Box  component="img"  sx={{ height: 50, width: 50, borderRadius: 10, marginRight: 15 }}  src={item.url ?item.url :defaultProduct } />
                          <Typography style={{color:"#000", fontSize:16, fontWeight:500}} >{item.name}</Typography>
                      </ListItem>
                  </Box>
                </Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{item.total_quantity ? item.total_quantity.toLocaleString() :0}</Typography></Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{ item.total_sell_price ? item.total_sell_price.toLocaleString() :0}</Typography></Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>Tổng lợi nhuận</Typography></Grid>
            </Grid>
            <Divider />
            </Box>
            )
        })}
     </ReportCard>
  )
}


const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      borderRadius: theme.customization.borderRadius,
      height: 40,
      marginLeft: 10,
      backgroundColor:
        theme.customization.mode === "Light" ? grey[50] : grey[700],
    },
    root:{
      background: theme.customization.mode === "Light"? '#fafbfb': grey[800],
      borderRadius:theme.customization.borderRadius, color: '#000000',  color: '#fafbfb',boxShadow: "none", padding:20, // paddingRight:10, // paddingLeft:20,
      margin:-20
    }
  
}));


var data = {
  options: {
    chart: { type: 'bar',minHeight: 350  },
    plotOptions: { bar: { borderRadius: 4, horizontal: true,  }},
    dataLabels: { enabled: false},
    xaxis: { 
      labels: { 
        formatter: function (value) { return  value >= 1000000? (value/1000000).toFixed().toLocaleString() +' triệu': value >= 1000 ? (value/1000).toFixed().toLocaleString() +'k' :value},
        style: {colors: ['#000'], fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500, cssClass: 'apexcharts-xaxis-label',  }, 
      }, 
    },
    yaxis: {
      labels: { 
        formatter: function (value) { return value.toLocaleString() ;  },
        style: {colors: ['#000'], fontSize: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500, cssClass: 'apexcharts-xaxis-label',  }, 
      },
    },
  },
}
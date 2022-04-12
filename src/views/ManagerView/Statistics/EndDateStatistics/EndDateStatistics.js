import React from 'react'
import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import { grey, blue,purple} from '@material-ui/core/colors'
import {Typography,Divider,Card,Grid,Avatar,Paper,Box,Button,InputLabel,MenuItem,FormControl,Select,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ava from '../../../../assets/img/product/lyimg.jpeg';

const EndDateStatistic = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    //0. set time
    const [time, setTime] = React.useState('30day');

    const handleChangeTime = (event) => {
    setTime(event.target.value);
    };

  return (
    <div className={classes.root}>
        <Grid container spacing={3}> 
            <Grid  item md={4}xs={12} >
                <Card className={classes.hoverCard} style={{padding:25, paddingRight:10}}>
                <Grid container justifyContent='space-between' >
                    <Grid item >
                        <Typography style={{ fontSize:18,fontWeight:500,}}>Thu - Chi</Typography>
                        <Typography style={{color:'#000', fontSize:22,fontWeight:500}}>200.000.000</Typography>
                        <Button  variant='contained'color='primary'size="small" style={{marginTop:15}}>Chi tiết</Button>
                    </Grid>
                    <Grid item >
                        <Box style={{marginBottom:5}}>
                        <FormControl className={classes.formControl} style={{marginTop:-5}} size="small" variant="outlined" >
                            <Select size="small" onChange={handleChangeTime} defaultValue="today"  value={time}  >
                                    <MenuItem value="today">Hôm nay</MenuItem>
                                    <MenuItem value="yesterday">Hôm qua</MenuItem>
                                    <MenuItem value="7day">7 ngày gần nhất</MenuItem>
                                    <MenuItem value="30day">30 ngày gần nhất</MenuItem>
                                    <MenuItem value="365day">365 ngày gần nhất</MenuItem>
                                    <MenuItem value="advance">Tìm kiếm nâng cao</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <Box style={{marginBottom:5}}>
                            <FormControl className={classes.formControl} style={{marginTop:-5}} size="small" variant="outlined" >
                                <Select size="small" onChange={handleChangeTime} defaultValue="today"  value={time}  >
                                        <MenuItem value="today">Chi nhánh trung tâm</MenuItem>
                                        <MenuItem value="yesterday">Hôm qua</MenuItem>
                                        <MenuItem value="7day">7 ngày gần nhất</MenuItem>
                                        <MenuItem value="30day">30 ngày gần nhất</MenuItem>
                                        <MenuItem value="365day">365 ngày gần nhất</MenuItem>
                                        <MenuItem value="advance">Tìm kiếm nâng cao</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>       
                    </Grid>
                </Grid>
                </Card>  
            </Grid>
            <Grid  item md={8} xs={12} >
                 <Card className={classes.hoverCard} >
                    <Grid  container >
                            <Grid  container item xs={3} justifyContent="space-between">
                                <SmallDetailBox bgColor={'#E5F9FB'} color={'#06C9D6'} title={"Hoá đơn"} value={20}/>
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid  container item xs={3} justifyContent="space-between">
                                <SmallDetailBox bgColor={'#FFF4E5'} color={'#FFC90C'} title={"Sản phẩm"} value={20}/>
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid  container item xs={3} justifyContent="space-between">
                                <SmallDetailBox bgColor={'#FCF2F5'} color={'#E56A75'} title={"Tổng thu"} value={20}/>
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid  container item xs={3} justifyContent="space-between">
                                <SmallDetailBox bgColor={'#EBFAF1'} color={'#00C292'} title={"Tổng chi"} value={20}/>
                            </Grid>
                    </Grid>
                </Card> 
            </Grid>
        </Grid>
        <Grid container spacing={2} > 
            <Grid   item md={6} xs={12} >
                <Card className={classes.hoverCard} style={{padding:25, marginTop:20}}>
                <Typography style={{marginBottom:30,color:"#000", fontSize:22}} variant="h5">Thống kê sản phẩm </Typography> 
                    <Grid container justifyContent='space-between' alignItems='center'  >
                    <Typography style={{color:"#000",fontSize:17,width:200, fontWeight:500,}}>Sản phẩm</Typography>
                    <Typography style={{ color:"#000",fontSize:17,fontWeight:500}}>SL</Typography>
                    <Typography style={{color:"#000",fontSize:17,fontWeight:500}}>Doanh thu</Typography>
                    </Grid>
                    <Divider style={{marginTop:15, marginBottom:10}} />
                    {[0,1,3,4,5,6,1,3,4,5].map(()=>{
                        return(
                        <Box style={{marginBottom:10}}>
                        <Grid container justifyContent='space-between' alignItems='center' style={{marginBottom:10}} >
                            <Box style={{width:200}}>
                                <ListItem style={{ margin:0, padding:0 }}  >
                                    <Box  component="img"  sx={{ height: 50, width: 50, borderRadius: 50, marginRight: 15 }}  src={ava} />
                                    <Typography style={{color:"#000", fontSize:16, fontWeight:500}} >Tên sản phẩm</Typography>
                                </ListItem>
                            </Box>
                            <Typography style={{color:"#000", fontSize:16}}>2</Typography>
                            <Typography style={{color:"#000", fontSize:16}}>Tổng thu</Typography>
                        </Grid>
                        <Divider />
                        </Box>
                        )
                    })}
                </Card>
            </Grid>
            <Grid  item md={6} xs={12} >
                <Card className={classes.hoverCard} style={{padding:25, marginTop:20}}>
                    <Typography style={{marginBottom:20,color:"#000", fontSize:22}} variant="h5">Thống kê bán hàng </Typography> 

                </Card>
            </Grid>
        </Grid>
    </div>
  )
}

export default EndDateStatistic

const SmallDetailBox = ({bgColor, color, title, value}) =>{
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
            <Box style={{flexGrow:1,textAlign:'center', alignContent:'center', paddingTop:10, paddingBottom:10}} >
                <Grid container justifyContent='center' >
                    <Avatar style={{backgroundColor:bgColor, color:color, width: theme.spacing(7),  height: theme.spacing(7)}}>
                        <AttachMoneyIcon/>
                    </Avatar> 
                </Grid>
            <Typography style={{color:'#000', fontSize:22,fontWeight:500, marginTop:10}}>{value}</Typography>
            <Typography  style={{marginTop:4, color:'#777e89'}}>{title}</Typography>
            </Box>
    )
}




const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? '#fafbfb': grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    color: '#fafbfb',
    boxShadow: "none",
    padding:20,
    // paddingRight:10,
    // paddingLeft:20,
    margin:-20
  },
  header:{
    paddingTop:20,
    paddingBottom:15
  },
  headerTitle:{
    fontSize: '1.125rem',
  },
  divider:{
      marginBottom:15
  },
  hoverCard:{
    boxShadow:' 0px 10px 20px rgba(0,0,0,0.09)',
    "&:hover": {
      boxShadow:'0px 10px 20px rgba(0,0,0,0.15)',
    },
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingTop:10,
    borderRadius:theme.customization.borderRadius
},
large: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));
import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//import library
import {Box,Grid,Collapse,Typography,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';

//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import ConfirmPopUp from "../../../../../components/ConfirmPopUp/ConfirmPopUp";

//import image
import avaUpload from '../../../../../assets/img/product/lyimg.jpeg';

//import project 
import {StyledMenu,StyledMenuItem} from '../../../../../components/Button/MenuButton'
import customerApi from "../../../../../api/customerApi";
import { statusAction } from "../../../../../store/slice/statusSlice";
import { useDispatch, useSelector } from 'react-redux';
import UpdateCustomer from "../CustomerDetail/UpdateCustomer/UpdateCustomer"
const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    fontSize: '1.125rem'
  },
  typo:{
    marginBottom:20
  }

}));

const UploadImage  = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 120,
        width: 120, 
        borderRadius:120,
        marginLeft:15,

      }}
      src={avaUpload}
    />
    
  )
}
const CustomerDetail = (props) => {
    const {row,openRow }= props.parentProps;
    const { isMini } = props;

    const theme = useTheme();
    const classes = useStyles(theme);
    const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;

    const [deleteConfirm, setDeleteConfirm] = React.useState(false);
    const [editItem,setEditItem] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid

    const handleClose = () => {
      setAnchorEl(null);
    };


    const handleDeleteCustomer = async () => {
      console.log(store_uuid, row.uuid);
      try {
        const response = await customerApi.deleteCustomer(store_uuid, row.uuid);
        dispatch(statusAction.successfulStatus("Xóa thành công"));
        props.parentProps.onReload();
      } catch (error) {
        console.log(error);
        dispatch(statusAction.failedStatus("Xóa thất bại"));
      }
    };

    return (
        <Collapse in={isMini?true: openRow === row.uuid } timeout="auto" unmountOnExit>
              <ConfirmPopUp
                open={deleteConfirm}
                handleClose={() => {
                  setDeleteConfirm(false);
                }}
                handleConfirm={handleDeleteCustomer}
                message={
                  <Typography>
                    Xóa vĩnh viễn khách hàng <b>{row.name} ?</b>
                  </Typography>
                }
              />

             <UpdateCustomer customerDetail = {row} open={editItem} onReload={props.parentProps.onReload}  handleClose={()=>{setEditItem(false)}}/>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>

              <Grid  container direction="row" justifyContent="flex-start">
                  <Grid item xs={12} sm={3}>
                      <UploadImage />
                  </Grid>
                <Grid item xs={12} sm={5}>
                      <Grid container direction="row" justifyContent="flex-start" > 
                        <Grid item xs={7} sm={5} >
                          <Typography variant="h5" gutterBottom component="div">Mã khách hàng </Typography>    
                        </Grid>
                        <Grid item sm={6} >
                          <Typography variant="body1" gutterBottom component="div">{row.customer_code} </Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={7} sm={5} >
                          <Typography variant="h5" gutterBottom component="div">Tên khách hàng </Typography>    
                        </Grid>
                        <Grid item sm={6} >
                          <Typography variant="body1" gutterBottom component="div">{row.name} </Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={7}sm={5} >
                            <Typography variant="h5" gutterBottom component="div">Số điện thoại</Typography>    
                          </Grid>
                          <Grid item sm={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.phone}</Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={7} sm={5} >
                            <Typography variant="h5" gutterBottom component="div">Thông tin thanh toán</Typography>    
                          </Grid>
                          <Grid item sm={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.payment_info}</Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={7} sm={5} >
                            <Typography variant="h5" gutterBottom component="div">Địa chỉ</Typography>    
                          </Grid>
                          <Grid item sm={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.address} </Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={7} sm={5} >
                            <Typography variant="h5" gutterBottom component="div">Email</Typography>    
                          </Grid>
                          <Grid item sm={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.email} </Typography>
                          </Grid>
                      </Grid>
                  </Grid>


                <Grid item xs={12} sm={4}>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={7} sm={6} >
                          <Typography variant="h5" gutterBottom component="div">Tổng tiền mua</Typography>    
                        </Grid>
                        <Grid item sm={6} >
                          <Typography variant="body1" gutterBottom component="div">3.000.000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={7} sm={6} >
                          <Typography variant="h5" gutterBottom component="div">Còn nợ</Typography>    
                        </Grid>
                        <Grid item sm={6} >
                          <Typography variant="body1" gutterBottom component="div">500.000</Typography>
                        </Grid>
                    </Grid>
                    
                  </Grid>
               
              </Grid>

              {/* Button */}
              <Grid container direction="row" justifyContent={"flex-end"} style={{marginTop:20}}> 
                          <Button variant="contained" size="small" style={{marginLeft:15}} onClick={() => {setEditItem(true)}}>Sửa</Button>
                          <Button variant="contained" size="small" style={{marginLeft:15}} onClick={() => {setDeleteConfirm(true)}}>Xoá</Button>
                          
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            size="small"
                            style={{marginLeft:10}}

                          >
                            <MoreVertIcon />
                          </IconButton>
                          
                          <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            
                           
                          >
                            <StyledMenuItem>
                              <ListItemIcon style={{marginRight:-15}}>
                                <HighlightOffTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Ngừng hoạt động" />
                            </StyledMenuItem>

                          </StyledMenu>


                      </Grid>

             </Box>
           </Collapse>
    )
}

export default CustomerDetail

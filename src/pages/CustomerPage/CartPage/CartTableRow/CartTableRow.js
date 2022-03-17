import React, { useEffect } from 'react'
//import style
import useStyles from "../../../../components/TableCommon/style/mainViewStyle";
//impỏrt library
import {Box,TextField,ListItem,IconButton,TableRow,TableCell,Typography} from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
//import project 
import * as Input from '../../../../components/TextField/NumberFormatCustom'
import ButtonQuantity from "../../../../components/Button/ButtonQuantity";
import { VNDFormat } from "../../../../components/TextField/NumberFormatCustom"
// import DiscountPopUp from "../DiscountPopup/DiscountPopup"
import icon from '../../../../assets/img/product/tch.jpeg';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';


 const CartRow = (props) =>{
    const classes = useStyles(); 
    const haveDiscount = true;

    const {row,discountData, handleDeleteItemCart, handleChangeItemQuantity, index} = props
    
    const updateQuantity = (newQuantity) => {
      handleChangeItemQuantity(index, newQuantity)
    }
    
    return (
      <TableRow  key={props.row.uuid} >
          <TableCell align="left" style={{minWidth:200, }}>
            <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10, alignItems:"flex-start", }}> 
                <Box component="img" sx={{ height: 90, width: 90,  borderRadius:10,  marginRight:15 }} src={row.img_url} />
                <Typography  style={{color:"#000",  marginTop:10, fontSize:14, }}>{row.name}</Typography>  
            </ListItem> 

            </TableCell>
          <TableCell align="center">
              <Typography  > <VNDFormat value={row.unit_price} /></Typography>  
          </TableCell>
  
          <TableCell align="center" padding='none' >
            {/*  */}
            <ButtonQuantity quantity={row.quantity} setQuantity={updateQuantity}  branch_quantity={row.branch_quantity} isMini={true} isCustomer={true} />  
          </TableCell>
          {/*  */}
          
          <TableCell align="right"className={classes.boldText}><VNDFormat value={row.unit_price * row.quantity} /></TableCell>
          <TableCell align="right" >
            <IconButton aria-label="expand row" size="small" >
                <DeleteForeverTwoToneIcon onClick={() => handleDeleteItemCart(row.uuid)}/>
            </IconButton>
          </TableCell>
        </TableRow>
    )
  }

  export default CartRow
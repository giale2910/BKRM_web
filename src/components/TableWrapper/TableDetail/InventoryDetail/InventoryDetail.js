import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import {Box,Grid,TextField} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import avaUpload from '../../../../assets/img/product/img.jpeg';
import {useTheme, makeStyles,createStyles,withStyles} from "@material-ui/core/styles";


const history =[{ date: '2020-01-05', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]


const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    // padding: '24px',
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
        height: 190,
        width: 190, 
        borderRadius:2,
        marginLeft:15,

      }}
      src={avaUpload}
    />
    
  )
}
const InventoryDetail = (props) => {
    const {row,labelId ,handleOpenRow,openRow }= props.parentProps;

    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Collapse in={ openRow === row.id } timeout="auto" unmountOnExit>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>
              <Grid  container direction="row" justifyContent="flex-start">
                  <Grid item xs={5}>
                      <UploadImage />
                  </Grid>
                <Grid item xs={7}>
                    <Grid container direction="row" justifyContent="flex-start" > 
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Mã hàng </Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Mã vạch </Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.barcode} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Danh mục</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.category} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5"gutterBottom component="div">Giá bán</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.price} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Giá vốn</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.import_price} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Tồn kho</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.quantity} </Typography>
                      </Grid>
                  </Grid>
                </Grid>
               
              </Grid>



               {/* <Typography variant="h4" gutterBottom component="div">
                 History
               </Typography>
               <Table size="small" aria-label="purchases">
                 <TableHead>
                   <TableRow>
                     <TableCell>Date</TableCell>
                     <TableCell>Customer</TableCell>
                     <TableCell align="right">Amount</TableCell>
                     <TableCell align="right">Total price ($)</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
    
                    {history.map((historyRow) => (
                     <TableRow key={historyRow.date}>
                       <TableCell component="th" scope="row">
                         {historyRow.date}
                       </TableCell>
                       <TableCell>{historyRow.customerId}</TableCell>
                       <TableCell align="right">{historyRow.amount}</TableCell>
                       <TableCell align="right">
                         {Math.round(historyRow.amount * row.price * 100) / 100}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table> */}
             </Box>
           </Collapse>
    )
}

export default InventoryDetail

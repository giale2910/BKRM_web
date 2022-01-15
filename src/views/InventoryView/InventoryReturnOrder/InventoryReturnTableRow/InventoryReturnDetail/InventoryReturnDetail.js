import React, { useEffect, useState } from 'react'
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

//import library
import { Box, Grid, TableHead, TableBody, Typography, Table, TableCell, TableRow, Collapse, Button, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';

//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';

//import project 
import { StyledMenu, StyledMenuItem } from '../../../../../components/Button/MenuButton'

import { grey } from '@material-ui/core/colors'
import { useSelector } from 'react-redux';
import purchaseReturnApi from '../../../../../api/purchaseReturnApi';

// dơn trả giá trả có khác ko ???

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(2),
      },
    },
    headerTitle: {
      fontSize: '1.125rem'
    },
    typo: {
      marginBottom: 20
    },
    background: {
      background: theme.customization.mode === "Light" ? theme.customization.primaryColor[50] : grey[700]
    }

  }));


const InventoryReturnDetail = (props) => {
  const { row, openRow } = props.parentProps;
  //  tam thoi
  const currentUser = "Minh Tri";
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const theme = useTheme();
  const classes = useStyles(theme);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [purchaseReturn, setPurchaseReturn] = useState({
    branch: null,
    details: []
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await purchaseReturnApi.getPurchaseReturn(store_uuid, row.uuid);
        // console.log(res.data)
        setPurchaseReturn(res.data);
      } catch (error) {
        setPurchaseReturn({
          branch: null,
          details: []
        });
      }
    }
    if (openRow === row.uuid) {
      loadData();

    }
  }
    , [props.parentProps.openRow]);


  return (
    <Collapse in={openRow === row.uuid} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
          {row.name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs={5}>
            <Grid container direction="row" justifyContent="flex-start" >
              <Grid item xs={5} >
                <Typography variant="h5" gutterBottom component="div">Mã trả hàng nhập </Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">{row.purchase_return_code} </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6} >
                <Typography variant="h5" gutterBottom component="div">Mã đơn nhập</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">
                  {purchaseReturn.purchase_order ? purchaseReturn.purchase_order.purchase_order_code : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5} >
                <Typography variant="h5" gutterBottom component="div">Ngày trả </Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">{row.creation_date} </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5} >
                <Typography variant="h5" gutterBottom component="div">Nhà cung cấp</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">
                  {purchaseReturn.supplier ? purchaseReturn.supplier.name : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5} >
                <Typography variant="h5" gutterBottom component="div">Người trả</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">
                  {purchaseReturn.created_by_user ? purchaseReturn.created_by_user.name : ""}
                </Typography>
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={5}>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6} >
                <Typography variant="h5" gutterBottom component="div">Trạng thái</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">Cần thu {row.total_amount - row.paid_amount}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6} >
                <Typography variant="h5" gutterBottom component="div">Tổng đơn trả hàng</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">{row.total_amount}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6} >
                <Typography variant="h5" gutterBottom component="div">Chi nhánh thực hiện</Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">
                  {purchaseReturn.branch ? purchaseReturn.branch.name : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6} >
                <Typography variant="h5" gutterBottom component="div">
                  Phương thức trả
                </Typography>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="body1" gutterBottom component="div">
                  {row.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ'}
                </Typography>
              </Grid>
            </Grid>

          </Grid>



        </Grid>




        <Typography variant="h4" gutterBottom component="div" style={{ marginTop: 30 }}>
          Danh sách sản phẩm
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              {/* thêm cột giá trả */}
              <TableCell>#</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá trả</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {purchaseReturn.details.map((detail) => (
              <TableRow key={detail.bar_code}>
                <TableCell component="th" scope="row">
                  {detail.bar_code}
                </TableCell>
                <TableCell>{detail.name}</TableCell>
                <TableCell align="right">{detail.quantity}</TableCell>
                <TableCell align="right">
                  {detail.unit_price}
                </TableCell>
                <TableCell align="right" style={{fontWeight:700}}>
                  {detail.quantity * detail.unit_price}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={classes.background} style={{ padding: 10, borderRadius: theme.customization.borderRadius, marginTop: 10 }}>
          <Grid container direction="column" >

            {/* <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">Tổng số lượng</Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">4 </Typography>
              </Grid>
            </Grid> */}

            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">Tổng số mặt hàng</Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">
                  {purchaseReturn.details.length}
                </Typography>
              </Grid>
            </Grid>

            {/* <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">
                  Tiền hàng trả
                </Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">{row.total_amount} </Typography>
              </Grid>
            </Grid> */}

            {/* <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">Phí trả</Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">200</Typography>
              </Grid>
            </Grid> */}
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">Tổng đơn trả hàng</Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">
                  {row.total_amount}
                  </Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2} >
                <Typography variant="h5" gutterBottom component="div">NCC đã trả</Typography>
              </Grid>
              <Grid item xs={2} >
                <Typography variant="body1" gutterBottom component="div">
                  {row.paid_amount}
                </Typography>
              </Grid>
            </Grid>

          </Grid>
        </Box>

        <Grid container direction="row" justifyContent="flex-end" style={{ marginTop: 20 }}>
          {/* Chỉ có nhân viên thực hiện nhập đơn đó  mới có thể xoá sửa */}
          {currentUser === row.employee ?
            <> <Button variant="contained" size="small" style={{ marginLeft: 15 }}>Sửa</Button>
              <Button variant="contained" size="small" style={{ marginLeft: 15 }}>Xoá</Button> </>
            : null
          }

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            style={{ marginLeft: 10 }}

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
              <ListItemIcon style={{ marginRight: -15 }}>
                <PrintTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="In đơn trả hàng nhập" />
            </StyledMenuItem>

            <StyledMenuItem>
              <ListItemIcon style={{ marginRight: -15 }}>
                <GetAppTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Xuất excel" />
            </StyledMenuItem>
          </StyledMenu>

        </Grid>

      </Box>
    </Collapse>
  )
}

export default InventoryReturnDetail

import React, { useState, useEffect ,useRef} from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {
  Typography,
  Card,
  Divider,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";

//import api

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
//riêng
import InventoryReturnTableRow from "./InventoryReturnTableRow/InventoryReturnTableRow";
import InventoryReturnFilter from "./InventoryReturnTool/InventoryReturnFilter";

//chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import JSONdata from "../../../assets/JsonData/inventoryReturn.json";
import { useSelector } from "react-redux";
import purchaseReturnApi from "../../../api/purchaseReturnApi";
const InventoryReturnOrder = () => {
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [openRow, setRowOpen] = React.useState(null);
  
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  const theme = useTheme();
  const classes = useStyles(theme);
  
  const loadData = async () => {
    try {
      const res = await purchaseReturnApi.getAllOfBranch(store_uuid, branch_uuid);
      setPurchaseReturns(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    loadData();
  }, [branch_uuid]);

  
  const handleOpenRow = (row) => {
    if (row !== openRow) {
      setRowOpen(row);
    } else {
      setRowOpen(null);
    }
  };

  // header sort
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");

  const handleRequestSort = (event, property) => {
    //// (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  //3. ToolBar
  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });
  //3.1. search

  //3.2. filter
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  //3.3. loc cot

  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        <Typography className={classes.headerTitle} variant="h5">
          Đơn trả hàng nhập
        </Typography>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      {/* <ToolBar  dataTable={inventoryReturnList} tableType={TableType.INVENTORY_RETURN} /*handlePrint={handlePrint}*/}
      <ToolBar
        dataTable={purchaseReturns}
        tableType={TableType.INVENTORY_RETURN}
        textSearch={"#, #đn, NCC, Nguoi trả,..."}
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
      />

      <InventoryReturnFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
        setPurchaseReturns={setPurchaseReturns}
      />

      {/* 3. TABLE */}
      <TableWrapper>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InventoryReturnOrderHeadCells}
        />
        <TableBody>
          {purchaseReturns.map((row, index) => {
            return (
              <InventoryReturnTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
              />
            );
          })}
        </TableBody>
      </TableWrapper>
      <div  style={{display:'none'}} >
        <div ref={componentRef}  >
        <ComponentToPrint  purchaseReturns={purchaseReturns} classes={classes}/>
        </div>
        
      </div>
    </Card>
  );
};


const ComponentToPrint = ({purchaseReturns,classes}) =>{
  return (
      <div >
        <Typography style={{flexGrow: 1,textAlign: "center",fontSize:20, fontWeight:500, margin:30, color:'#000'}} >Danh sách đơn trả hàng nhập</Typography>
        <div >
          <TableHeader
                classes={classes}
                headerData={HeadCells.InventoryReturnOrderHeadCells}
              />
              <TableBody >
                {purchaseReturns.map((row, index) => {
                  return (
                    <InventoryReturnTableRow
                      key={row.uuid}
                      row={row}
                    
                    />
                  );
                })}
              </TableBody>
        </div>
  </div>
  )
}

export default InventoryReturnOrder;

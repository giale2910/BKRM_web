import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
// import style
import {
  Typography,
  Card,
  Button,
  Divider,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
// import lib
import { useReactToPrint } from "react-to-print";
// import api

// import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

/// /import project
// riêng
import InvoiceReturnFilter from "./InvoiceReturnTool/InvoiceReturnFilter";
import InvoiceReturnTableRow from "./InvoiceReturnTableRow/InvoiceReturnTableRow";
// chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import refundApi from "../../../api/refundApi";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {BillMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"
import Pagination from "../../../components/TableCommon/TableWrapper/Pagination"
import { statusAction } from "../../../store/slice/statusSlice";
function InvoiceReturn() {
  // fetch data here
  const invoiceReturnList = [];
  const [refunds, setRefunds] = useState([]);
  // api
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;
  const dispatch = useDispatch();

  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;


  /// / 2. Table

  // collapse
  const [openRow, setRowOpen] = React.useState(null);
  const handleOpenRow = (row) => {
    if (row !== openRow) {
      setRowOpen(row);
    } else {
      setRowOpen(null);
    }
  };

  // // header sort
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('id');

  const initialQuery = {
    startDate: '',
    endDate: '',
    minDiscount: 0,
    maxDiscount: 0,
    minTotalAmount: 0,
    maxTotalAmount: 0,
    status: '',
    paymentMethod: '',
    orderBy: 'refunds.created_at',
    sort: 'desc',
    searchKey: '',
  };

  const handleRemoveFilter = () => {
    setQuery(initialQuery)
  }
  

  const handleRequestSort = (event, property) => {
    /// / (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  // 3. ToolBar
  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // 3.1. search

  // 3.2. filter
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  // 3.3. loc cot

  const [reload, setReload] = useState(false);

  const [query, setQuery] = useState(initialQuery)
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });
  const [totalRows, setTotalRows] = useState(0)
  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid, query]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await refundApi.getAllOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query
          }
        );
        // setPagingState({ ...pagingState, total_rows: response.total_rows });
        setTotalRows(response.total_rows)
        setRefunds(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid) {
      loadData();
    }
  }, [pagingState.page, pagingState.limit, store_uuid, branch_uuid, query]);
  const getDataExport = async () => {
    try {
      const response = await refundApi.getAllOfBranch(
        store_uuid,
        branch_uuid,
        query,
      );
      return response.data;
    } catch (error) {
      dispatch(statusAction.failedStatus('Không thể lấy dữ liệu'))
      console.log(error);
    }
  }
  const tableRef = React.createRef();


  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        <Typography className={classes.headerTitle} variant="h5">
          Đơn trả
        </Typography>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT */}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={refunds}
        tableType={TableType.INVOICE_RETURN}
        textSearch="#,#hđ, Khách, Người trả,...  " /* handlePrint={handlePrint} */
        handlePrint={handlePrint}
        handleToggleFilter={handleToggleFilter}

        orderByOptions={[
          {value: 'refunds.created_at', label: 'Ngày nhập'},
          {value: 'refunds.total_amount', label: 'Tổng tiền tra'},
        ]}
        orderBy={query.orderBy} setOrderBy={(value) => setQuery({...query, orderBy: value})}
        sort={query.sort} setSort={(value) => setQuery({...query, sort:value})}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
        handleRemoveFilter={handleRemoveFilter}
        getDataExport={getDataExport}
      />
      <InvoiceReturnFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
        setRefunds={setRefunds}
      />
      {/* 3. TABLE */}
      {!xsScreen?<TableWrapper pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState} 
        list={refunds}
        tableRef={tableRef}
        >
        <TableHeader
          classes={classes}
          // order={order}
          // orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InvoiceReturnHeadCells}
        />
        <TableBody>
          {refunds.map((row, index) => (
            <InvoiceReturnTableRow
              key={row.uuid}
              row={row}
              openRow={openRow}
              handleOpenRow={handleOpenRow}
            />
          ))}
        </TableBody>
      </TableWrapper>:
          <>
           <Box style={{minHeight:'50vh'}}>
          {refunds.map((row, index) => (
            // <InvoiceReturnTableRow
            //   key={row.uuid}
            //   row={row}
            //   openRow={openRow}
            //   handleOpenRow={handleOpenRow}
            // />
            <BillMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow} 
          totalCost={row.total_amount}  id={row.refund_code} partnerName={row.customer_name} date={row.created_at} 
          typeBill={"Đơn trả"}/>

          ))}
          </Box>
          <Pagination pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState}         list={refunds}/>
    
          </>
          }
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint refunds={refunds} classes={classes} />
        </div>
      </div>
    </Card>
  );
}

export default InvoiceReturn;

const ComponentToPrint = ({ refunds, classes }) => {
  return (
    <div>
      <Typography
        style={{
          flexGrow: 1,
          textAlign: "center",
          fontSize: 20,
          fontWeight: 500,
          margin: 30,
          color: "#000",
        }}
      >
        Danh sách đơn trả
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InvoiceReturnHeadCells}
        />
        <TableBody>
          {refunds.map((row, index) => {
            return <InvoiceReturnTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};

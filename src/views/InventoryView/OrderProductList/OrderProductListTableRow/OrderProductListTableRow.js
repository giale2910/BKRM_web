import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";
import { VNDFormat,ThounsandFormat } from '../../../../components/TextField/NumberFormatCustom';
import {TableCell,TableRow} from '@material-ui/core';

import {FormatedStatusOrder} from '../../../../components/TableCommon/util/format'
import OrderProductListDetail from './OrderProductListDetail/OrderProductListDetail'

const OrderProductListTableRow = (props) => {
    const { row, handleOpenRow,openRow} = props;
    const classes = useRowStyles();

    return (
        <>
        {/* ROW */}
            <TableRow
            onClick={() => handleOpenRow(row.uuid)}   
            key={row.uuid}
            className={ clsx(classes.row,(openRow === row.uuid) ? classes.rowClicked : null)}
            >
                <TableCell align="left" >{row.id}</TableCell>
                <TableCell align="left"className={classes.fontName}>{row.date}</TableCell>
                <TableCell align="left"className={classes.fontName} style={{minWidth:150}}>{row.supplier}</TableCell>
                <TableCell align="left">{row.branch}</TableCell>
                <TableCell align="right" className={classes.fontName}><VNDFormat value={row.total} /></TableCell>
                <TableCell align="center">
                    <FormatedStatusOrder status={row.status}/>
                </TableCell>
                <TableCell align="left">{row.employee}</TableCell>
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <OrderProductListDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default OrderProductListTableRow

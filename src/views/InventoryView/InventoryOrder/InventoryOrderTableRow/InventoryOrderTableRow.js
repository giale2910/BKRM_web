import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";

import {TableCell,TableRow} from '@material-ui/core';

import {FormatedStatus} from '../../../../components/TableCommon/util/format'
import InventoryOrderDetail from './InventoryOrderDetail/InventoryOrderDetail'
import {VNDFormat} from '../../../../components/TextField/NumberFormatCustom'

const InventoryOrderTableRow = (props) => {
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
                <TableCell align="left" >{row.purchase_order_code}</TableCell>
                <TableCell align="left" >{row.creation_date}</TableCell>
                <TableCell align="left"className={classes.fontName}>{row.supplier_name}</TableCell>
                <TableCell align="left"className={classes.fontName} style={{minWidth:150}}>{row.branch_name}</TableCell>
                <TableCell align="left">{row.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ'}</TableCell>
                <TableCell align="right"><VNDFormat value={row.total_amount}/></TableCell>
                <TableCell align="center" className={classes.fontName}>
                    <FormatedStatus debt={row.status === 'debt' ? 1 : 0}/>
                </TableCell>
               
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <InventoryOrderDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default InventoryOrderTableRow

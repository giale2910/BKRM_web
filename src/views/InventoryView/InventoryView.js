import { Box, Typography } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Import from './Import/Import'
import Inventory from './Inventory/Inventory'
import InventoryOrder from './InventoryOrder/InventoryOrder'
import InventoryReturnOrder from './InventoryReturnOrder/InventoryReturnOrder'
import Supplier from './Supplier/Supplier'
import PageNotFound from '../../pages/PageNotFound/PageNotFound'


import React from "react";

const InventoryView = (props) => {
  const { path, url } = useRouteMatch();
  return (

      <Switch>
        <Route exact path={path} component={Import}/>
        <Route exact path={`${path}/import`} component={Import} />
        <Route path={`${path}/inventory`} component={Inventory}>
          {/* <Switch>
            <Route exact path={`${path}/inventory`} component={Inventory} />
            <Route exact path={`${path}/inventory/add`} component={AddProduct} />
            <Route exact path={`${path}/inventory/details/:id`} component={InventoryDetail} />
            <Route exact path={`${path}/inventory/*`} component={NotPageFound} />
          </Switch> */}
        </Route>
        <Route path={`${path}/receipt`}  component={InventoryOrder}/>
        <Route path={`${path}/returns`}  component={InventoryReturnOrder}/>         
        <Route path={`${path}/supplier`}  component={Supplier}/>
        <Route exact path={`${path}/*`} component={PageNotFound}/>
      
      </Switch>

  );
};

export default InventoryView;
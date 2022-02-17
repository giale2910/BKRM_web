import { Route, Switch, useRouteMatch } from "react-router-dom";
import History from "./History/History";
import Branch from "./Branch/Branch";

import GeneralSetting from "./Setting/GeneralSetting";
import DiscountSetting from "./Setting/DiscountSetting";
import VoucherSetting from "./Setting/VoucherSetting";
import WebSetting from "./Setting/WebSetting";

import Customer from "./Customer/Customer";
import Report from "./Report/Report";

const ManagerView = (props) => {
  
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={History} />
      <Route exact path={`${path}/history`} component={History} />
      <Route path={`${path}/branch`} component={Branch} />
      
      <Route path={`${path}/customer`} component={Customer} />
      <Route path={`${path}/report`} component={Report} />
      <Route path={`${path}/report-date`} component={GeneralSetting} />

      <Route path={`${path}/setting`} component={GeneralSetting} />
      <Route path={`${path}/setting-discount`} component={DiscountSetting} />
      <Route path={`${path}/setting-voucher`} component={VoucherSetting} />
      <Route path={`${path}/setting-web`} component={WebSetting} />
      
    </Switch>
  );
};

export default ManagerView;

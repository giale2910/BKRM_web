import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import History from "./History/History";
import Branch from "./Branch/Branch";

import GeneralSetting from "./Setting/GeneralSetting/GeneralSetting";
import DiscountSetting from "./Setting/DiscountSetting/DiscountSetting";
import VoucherSetting from "./Setting/VoucherSetting/VoucherSetting";
import WebSetting from "./Setting/WebSetting/WebSetting";
import EmailSetting from "./Setting/EmailSetting/EmailSetting"
import Customer from "./Customer/Customer";
import Report from "./Report/Report";
import { useSelector } from "react-redux";
import AbousUsSetting from "./Setting/WebSetting/AbousUsSetting";

const ManagerView = (props) => {
  
  const { path } = useRouteMatch();
  const permissions = useSelector((state) => state.info.user.permissions);
  return (
    <Switch>
      <Route exact path={path} component={History} >
        <Redirect to={permissions?.find((p) => p.name === "report") ? `${path}/history` : "/home"}/>
      </Route>
      <Route exact path={`${path}/history`} component={History} />
      <Route path={`${path}/branch`} component={Branch} />
      
      <Route path={`${path}/customer`} component={Customer} />
      <Route path={`${path}/report`} component={Report} />
      <Route path={`${path}/report-date`} component={GeneralSetting} />

      <Route path={`${path}/setting`} component={GeneralSetting} />
      <Route path={`${path}/setting-discount`} component={DiscountSetting} />
      <Route path={`${path}/setting-voucher`} component={VoucherSetting} />
      <Route path={`${path}/setting-web`} component={WebSetting} />
      <Route path={`${path}/setting-email`} component={EmailSetting} />
      <Route path={`${path}/aboutus-setting`} component={AbousUsSetting} />
      
    </Switch>
  );
};

export default ManagerView;

import React, { Component } from "react";
import { Switch } from "react-router-dom";

import ManageRoute from "./ManageRoute";
import AddBtn from "./Utils/AddBtn";

import Cities from "./City/Cities";
import Parishes from "./Parish/Parishes";
import ManageCenters from "./Center/ManageCenters";
import Rastes from "./Raste/Rastes";
import OtaghAsnafs from "./OtaghAsnaf/OtaghAsnafs";
import OtaghBazarganis from "./OtaghBazargani/OtaghBazarganis";
import Etehadiyes from "./Etehadiye/Etehadiyes";
import Users from "./User/Users";
import Rates from "./Rate/Rates";
import States from "./State/States";
import Massages from "./Massage/Massages";

class Manage extends Component {
  render() {
    return (
      <div className="pinteb-wraper-80">
        <div className="center-workshit width-same-big">
          <AddBtn txt="استان ها" url={`${this.props.match.url}/states`} levels={["tarah"]} />
          <AddBtn txt="شهرها" url={`${this.props.match.url}/city`} levels={["tarah"]} />
          <AddBtn txt="محله" url={`${this.props.match.url}/parish`} levels={["tarah", "organic.operatorAs"]} />
          <AddBtn txt="اتاق بازرگانی" url={`${this.props.match.url}/otaghBazargani`} levels={["tarah"]} />
          <AddBtn txt="اتاق اصناف" url={`${this.props.match.url}/otaghAsnaf`} levels={["tarah"]} />
          <AddBtn txt="اتحادیه" url={`${this.props.match.url}/etehadiye`} levels={["tarah", "organic.operatorAs"]} />
          <AddBtn txt="رسته" url={`${this.props.match.url}/raste`} levels={["tarah", "organic.operatorAs"]} />
          <AddBtn txt="امکانات صنف" url={`${this.props.match.url}/option`} levels={["tarah"]} />
          <AddBtn txt="صنف" url={`${this.props.match.url}/center`} levels={["tarah", "organic.operatorAs"]} />
          <AddBtn txt="نظرها" url={`${this.props.match.url}/rates`} levels={["tarah"]} />
          <AddBtn txt="پیام ها" url={`${this.props.match.url}/massages`} levels={["tarah"]} />
          <AddBtn txt="کاربران" url={`${this.props.match.url}/users`} levels={["tarah"]} />
        </div>
        <Switch>
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/states" component={States} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/city" component={Cities} />
          <ManageRoute
            levels={["tarah", "admin", "owner", "organic.operatorAs"]}
            path="/manage/parish"
            component={Parishes}
          />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/otaghBazargani" component={OtaghBazarganis} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/otaghAsnaf" component={OtaghAsnafs} />
          <ManageRoute
            levels={["tarah", "admin", "owner", "organic.operatorAs"]}
            path="/manage/etehadiye"
            component={Etehadiyes}
          />
          <ManageRoute
            levels={["tarah", "admin", "owner", "organic.operatorAs"]}
            path="/manage/center"
            component={ManageCenters}
          />
          <ManageRoute levels={["tarah", "admin", "owner", "organic.operatorAs"]} path="/manage/raste" component={Rastes} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/rates" component={Rates} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/massages" exact component={Massages} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/users" component={Users} />
        </Switch>
      </div>
    );
  }
}

export default Manage;

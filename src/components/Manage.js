import React, { Component } from "react";
import { Switch } from "react-router-dom";

import ManageRoute from "./ManageRoute";
import AddBtn from "./Utils/AddBtn";

import Cities from "./City/Cities";
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
          <AddBtn txt="اتاق اصناف" url={`${this.props.match.url}/otaghAsnaf`} levels={["tarah"]} />
          <AddBtn txt="اتاق بازرگانی" url={`${this.props.match.url}/otaghBazargani`} levels={["tarah"]} />
          <AddBtn txt="رسته" url={`${this.props.match.url}/raste`} levels={["tarah"]} />
          <AddBtn txt="اتحادیه" url={`${this.props.match.url}/etehadiye`} levels={["tarah"]} />
          <AddBtn txt="امکانات فروشگاه" url={`${this.props.match.url}/option`} levels={["tarah"]} />
          <AddBtn txt="فروشگاه" url={`${this.props.match.url}/center`} levels={["tarah"]} />
          <AddBtn txt="نظرها" url={`${this.props.match.url}/rates`} levels={["tarah"]} />
          <AddBtn txt="پیام ها" url={`${this.props.match.url}/massages`} levels={["tarah"]} />
          <AddBtn txt="کاربران" url={`${this.props.match.url}/users`} levels={["tarah"]} />
        </div>
        <Switch>
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/city" component={Cities} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/center" component={ManageCenters} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/raste" component={Rastes} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/states" component={States} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/users" component={Users} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/rates" component={Rates} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/otaghAsnaf" component={OtaghAsnafs} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/otaghBazargani" component={OtaghBazarganis} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/etehadiye" component={Etehadiyes} />
          <ManageRoute levels={["tarah", "admin", "owner"]} path="/manage/massages" exact component={Massages} />
        </Switch>
      </div>
    );
  }
}

export default Manage;

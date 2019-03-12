import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeDelivery, setForPaid, RU } from '../../actions'
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

class Purchase extends Component {
  remove(id) {
    console.log('id az removee shahr', id);
    this.props.removeDelivery(id);
  }
  render() {
  	return (
  		<div className={cx('grid-manage', {'not-paid': !this.props.isPad})}>

					<div className="grid-manage-detail">
						<div className="grid-manage-text">
							<div className="grid-m-t-n">ارسال شده برای : </div>
							<div className="grid-m-t-a"> {this.props.address.state.name} - {this.props.address.town.name} - {this.props.address.district} - {this.props.address.text} </div>
							<div className="grid-m-t-n">کالاها : </div>
							{this.props.waresArr.map(ware => (
							<div className="grid-m-t-a" key={ware._id}> {ware.title} - تعداد : {ware.amount} - جمع قیمت : {ware.totalPrice} </div>
							))}

							<div className="grid-m-t-n">قیمت ها : </div>
							<div className="grid-m-t-a"> قیمت تمام شده محصولات : {this.props.sumTotalPrice} </div>
							<div className="grid-m-t-a"> هزینه و نوع پست : {this.props.delivery.name} - {this.props.delivery.cost} </div>
							<div className="grid-m-t-a"> قیمت تمام شده + هزینه پست : {this.props.sumTotalPriceWithDelivery} </div>
						</div>
						<div className="grid-manage-btn">
							<span onClick={() => {
								this.props.setForPaid(this.props)
								this.props.history.push(`/paypurchase/${this.props._id}`)
								}} className='dogme i-round i-sabz round-small' >جزئیات </span>
							<span onClick={this.remove.bind(this, this.props._id)} className='dogme i-round i-ghermez round-small' >حذف </span>
						</div>
					</div>
  		</div>
  	)
  }
}

export default withRouter(connect(null, { removeDelivery, setForPaid })(Purchase));

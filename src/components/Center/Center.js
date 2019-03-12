import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCenter, RU } from '../../actions';
class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
  		center: { lat: this.props.location.coordinates[1], lng: this.props.location.coordinates[0] }, zoom: 16
    };
  }
	directPic() {
		if ( this.props.pic && this.props.pic.length > 0 ) {
			const masir = `${ RU }/pic/orginal/${ this.props.pic[0] }`;
			return <img src={masir} alt={this.props.name}/>
		} else {
			return <img src={`../img/back/01.jpg`} alt={this.props.name}/>;
		}
	}
  remove(id) {
    console.log('id az removee shahr', id);
    this.props.removeCenter(id);
  }
  render() {
  	return (
  		<div className='grid-manage'>
  				<div className='grid-manage-pic'>
            {this.directPic()}
  				</div>
					<div className="grid-manage-detail">
						<div className="grid-manage-text">
							<div className="grid-m-t-n">{this.props.name}</div>
							<div className="grid-m-t-a">{this.props.address}</div>
						</div>
						<div className="grid-manage-btn">
							<Link className='dogme i-round i-sabz round-small' to={{ pathname: `/manage/center/edit/${ this.props._id }` }}> ویرایش </Link>
							{(this.props.pic && this.props.pic.length > 0) && <Link className='dogme i-round i-sabz round-small' to={{ pathname: `/manage/center/edit/pic/${ this.props._id }` }}> ویرایش تصاویر</Link>}
							<Link className='dogme i-round i-abi round-small' to={`/manage/center/changepic/${ this.props._id }`}> افزودن تصویر </Link>
							<Link className='dogme i-round i-abi round-small' to={`/manage/center/doctor/${ this.props._id }`}>اختصاص طبیب</Link>
							<Link className='dogme i-round i-abi round-small' to={`/manage/center/address/${ this.props._id }`}>افزودن آدرس</Link>
							<span onClick={this.remove.bind(this, this.props._id)} className='dogme i-round i-ghermez round-small' >حذف </span>
						</div>
					</div>
  		</div>
  	)
  }
}

export default connect(null, { removeCenter })(Center);

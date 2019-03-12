import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeWareType, RU } from '../../actions';

class WareType extends Component {
	directPic() {
		if ( this.props.pic ) {
			const masir = `${ RU }/pic/orginal/${ this.props.pic }`;
			return <img src={masir} alt={this.props.name}/>
		} else {
			return <img src={`./img/back/01.jpg`} alt={this.props.name}/>;
		}
	}
  remove(id) {
    console.log('id az removee shahr', id);
    this.props.removeWareType(id);
  }
  render() {
  	return (
  		<div className='grid-dore'>
  			<div className='dore'>
  				<div className='aksdore'>
            {this.directPic()}
  				</div>
  				<div className='sarfasl'>
  					<div className='namedore'>
  						<div className='namedore-esm-asli'>{this.props.name}</div>
  						<div className='namedore-esm-asli'>{this.props.enName}</div>
  					</div>
  				</div>
          <div className='paddah'>
    				<Link className='dogme i-round i-sabz temamsafe' to={{
    					pathname: `/type/edit/${ this.props._id }`
    				}}>
    					ویرایش
    				</Link>
    				<span
              onClick={this.remove.bind(this, this.props._id)}
              className='dogme i-round i-ghermez temamsafe'
            >
    					حذف
    				</span>
          </div>
  			</div>
  		</div>
  	)
  }
}

export default connect(null, { removeWareType })(WareType);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import Select from 'react-select'
import { getWareTypes, cleanCenters } from '../../actions'

class ChangeWareTypeModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			wareType: null,
		};
	}

  componentWillMount() {
		this.props.getWareTypes();
  }
  onSubmit() {
    let query = qs.parse(this.props.location.search);
    let { wareType } = this.state;
    query.wareType = wareType;
    
    this.props.cleanCenters();
		this.props.history.push({ pathname: '/centers', search: qs.stringify(query) });
  }

  handleWareTypeSelect(wareType) {
		wareType ? this.setState({ wareType: wareType.enName }) : this.setState({ wareType: null })
  }

  render() {

    const { wareTypes } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal-select-box'>
          <h1>انتخاب محصول </h1>
            <div className='select'>
              <Select
                name="wareType"
                labelKey='name'
                valueKey='enName'
                rtl={true}
                placeholder='یک محصول انتخاب کنید'
                value={this.state.wareType}
                optionClassName='option-select'
                onChange={this.handleWareTypeSelect.bind(this)}
                options={wareTypes.wareTypes}
              />
            </div>

            <button className='dogme i-round i-abi temamsafe z-index-0' onClick={this.onSubmit.bind(this)}>تأیید</button>
        </div>
      </div>
    )
  }

}

const msp = ({wareTypes}) => ({wareTypes})

export default connect(msp, { getWareTypes, cleanCenters })(ChangeWareTypeModal);

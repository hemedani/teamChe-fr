import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import Select from 'react-select';
import { getCities, cleanCenters, ADD_CITY } from '../../actions'

class ChangeCityModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			city: null,
		};
	}
  componentDidMount() {
		this.props.getCities()
  }
  onSubmit() {
    let query = qs.parse(this.props.location.search);
    let { city } = this.state;
    query.city = city;

    this.props.cleanCenters();
		this.props.history.push({ pathname: '/centers', search: qs.stringify(query) });
  }

  handleCitySelect(city) {
		city ? this.setState({ city: city.enName }) : this.setState({ city: null })
  }

  render() {

    const { cities: { cities } } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal-select-box'>
          <h1>انتخاب شهر </h1>

          <div className='select'>
            <Select
              name="city"
              labelKey='name'
              valueKey='enName'
              rtl={true}
              placeholder='یک شهر انتخاب کنید'
              value={this.state.city}
              onChange={this.handleCitySelect.bind(this)}
              options={cities}
            />
          </div>

            <button className='dogme i-round i-abi temamsafe z-index-0' onClick={this.onSubmit.bind(this)}>تغییر شهر</button>
        </div>
      </div>
    )
  }

}

const msp = ({cities}) => ({cities})

export default connect(msp, { getCities, cleanCenters })(ChangeCityModal);

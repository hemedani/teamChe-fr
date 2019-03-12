import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { setExpertRate, SET_EXPERT_RATE_SET} from '../../actions'
import DotLoader from '../Utils/DotLoader'


class AddExpertRateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exRate: '',
    }
  }
  componentDidMount() {
    if (this.props.center.center.expertRate) { this.setState({exRate: this.props.center.center.expertRate}) }
  }

  setingExpertRate() {
    this.props.setExpertRate(this.state.exRate, this.props.match.params.id)
      .then((resp) => {if (resp.type === SET_EXPERT_RATE_SET) { this.props.history.goBack()}})
  }
  render() {

    const { rates } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>
            
            {rates.experRateLoading ? <DotLoader /> : (
              <div>
                <div className='selec-box-wrapper'>
                  {rates.expertRates.map((exRate) => (
                      <div className={cx('select-box', {'active-select-box': this.state.exRate === exRate.rate})} key={exRate.rate} onClick={() => {
                        if (this.state.exRate === exRate.rate) {
                          this.setState({ exRate: ''})
                        } else {
                          this.setState({ exRate: exRate.rate })
                        }
                      }}>
                        <span className='pinteb-icon icon-atari' ></span>
                        <div> رتبه {exRate.rate}</div>
                      </div>
                  ))}
                </div>
                <div className='chapchin width-same'>
                  <button onClick={this.setingExpertRate.bind(this)} className='dogme i-round i-abi'>ذخیره</button>
      
                  <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
                </div>
              </div>
            )}
            
        </div>
      </div>
    )
  }

}
const msp = ({ rates, center }) => ({ rates, center })
export default connect(msp, { setExpertRate })(AddExpertRateModal);

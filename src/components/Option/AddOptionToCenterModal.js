import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { getOptions, setOptionForCenter, SET_OPTION_FOR_CENTER } from '../../actions'
import DotLoader from '../Utils/DotLoader'

class AddOptionToCenterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }
  componentWillMount() {
    this.props.getOptions()
  }
  componentDidMount() {
    if (this.props.center.center.options) {
      this.setState({ options: this.props.center.center.options })
    }
  }

  settingOptionToCenter() {
    const { options } = this.state;
    this.props.setOptionForCenter(options, this.props.match.params.id)
      .then((resp) => {if (resp.type === SET_OPTION_FOR_CENTER) { this.props.history.goBack()}})
  }
  render() {

    const { center, options } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>
            
            {options.addOptionToCenterLoading ? <DotLoader /> : (
              <div>

                <div className='selec-box-wrapper' >
                  {options.options.map((option) => (
                    <div  className={cx('select-box', {'active-select-box': _.some(this.state.options, option)})} key={option._id} onClick={() => {
                      let { options } = this.state;
                      options = _.xorBy(options, [option], '_id')
                      this.setState({ options })
                      console.log(options);
                    }}>
                      <span className='pinteb-icon icon-atari' ></span>
                      <div>{option.name}</div>
                    </div>
                  ))}
                </div>

                <div className='chapchin width-same'>
                
                  <button onClick={this.settingOptionToCenter.bind(this)} className='dogme i-round i-abi'>ذخیره</button>
      
                  <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
                </div>
                
              </div>
            )}
            
        </div>
      </div>
    )
  }

}
const msp = ({ center, options }) => ({ center, options })
export default connect(msp, { getOptions, setOptionForCenter })(AddOptionToCenterModal);

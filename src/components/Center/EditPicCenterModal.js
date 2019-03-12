import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEditedCenter, removeCenterPic, RU } from '../../actions'
import DotLoader from '../Utils/DotLoader'

class EditPicCenterModal extends Component {
	componentWillMount( ) {
    this.props.getEditedCenter(this.props.match.params.id)
  }
  deletePic(pic) {
    this.props.removeCenterPic(this.props.match.params.id, pic)
  }
  render() {

    const { center } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

        {center.editedCenterLoading ? ( <DotLoader height={'10rem'}/> ) : (
          // <div>{center.editedCenter.pic.map(pi => <img src={`${ RU }/pic/800/${pi}`} />)}</div>

          <div className="uploaded-pic-wrapper edit-pic">
            {center.editedCenter.pic.map(upPic => (
              <div key={upPic}>
                <div className="image">
                  <img src={`${ RU }/pic/orginal/${ upPic }`} alt="upPic.name"/>
                </div>
                <span className="pinteb-icon icon-remove" onClick={this.deletePic.bind(this, upPic)}></span>
              </div>
            ))}
          </div>

        )}
        </div>
      </div>
    )
  }

}

const msp = ({ center }) => ({ center })

export default connect(msp, {getEditedCenter, removeCenterPic})(EditPicCenterModal)

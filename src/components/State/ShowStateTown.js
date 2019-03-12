import React, { Component } from 'react'

const ShowStateTown = ({ offShowTowns, towns }) =>
    (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={offShowTowns}></div>
        <div className='modal'>
          <div className="town-wrapper">
            {towns.map(town => (
              <span className='town-span' key={town._id}> {town.name} </span>
            ))}
          </div>
        </div>
      </div>
    )



export default ShowStateTown;

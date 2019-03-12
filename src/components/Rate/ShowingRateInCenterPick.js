import React from 'react'
import StarRatings from 'react-star-ratings'
import { toastr } from 'react-redux-toastr'

import { renderRateText } from '../Utils/exRate'

const ShowingRateInCenterPick = ({ rates, ware, raste, sendVote, RU }) => {
  
  const sendingVote = (rateId, vote) => {
    let plus, minus;
    vote === 'plus' ? plus = true : plus = null;
    vote === 'minus' ? minus = true : minus = null;

    if (!localStorage.getItem( 'token' )) {
      toastr.info('با تشکر', 'لطفا برای ثبت رای وارد شوید')
    } else {
      sendVote({rateId, plus, minus})
    }
  }

  return (
  <div className='center-wares-wraper center-rate-wrapper'>
  <div className='header'>
    <span className='pinteb-icon icon-atari'></span>
    <h3 >دیدگاه کاربران</h3>
  </div>
  <div className='center-rates'>
    {rates.map((rate) => (
      <div className="center-rate-container" key={rate._id}>
        <div className='center-rate'>
          <div className='rate-img'>
            {rate.user.pic ? (<img src={`${ RU }/pic/orginal/${ rate.user.pic }`} alt={ rate.user.familyName }/>) : ( <img src='../img/default/default-user.svg' alt={rate.user.familyName}/>)}
          </div>
          <div className='rate-rate-text' >
            <div className='rate-rate'>
            {ware ? (
              <div className='rate-text-detail'>

              <div className='rate-name'>{rate.user.name} {rate.user.familyName}</div>
              <div className='rate-rate-quality rate-three' >
                <span>امتیاز محصول</span>
                <StarRatings
                  rating={rate.wareRate || 0}
                  starWidthAndHeight={'10px'}
                  starSpacing={'1px'}
                  isAggregateRating={false}
                  numOfStars={ 5 }
                />
              </div>

            </div>
            ) : (
              <div className='rate-text-detail'>

                <div className='rate-name'>{rate.user.name} {rate.user.familyName}</div>
                <div className='rate-rate-quality rate-three' >
                  <span>{renderRateText(raste, 'quality')}</span>
                  <StarRatings
                    rating={rate.qualityRate || 0}
                    starWidthAndHeight={'10px'}
                    starSpacing={'1px'}
                    isAggregateRating={false}
                    numOfStars={ 5 }
                  />
                </div>
                <div className='rate-rate-salesman rate-three' >
                  <span>{renderRateText(raste, 'salesman')}</span>
                  <StarRatings
                    rating={rate.salesmanRate || 0}
                    starWidthAndHeight={'10px'}
                    starSpacing={'1px'}
                    isAggregateRating={false}
                    numOfStars={ 5 }
                  />
                </div>
                <div className='rate-rate-price rate-three' >
                  <span>{renderRateText(raste, 'price')}</span>
                  <StarRatings
                    rating={rate.priceRate || 0}
                    starWidthAndHeight={'10px'}
                    starSpacing={'1px'}
                    isAggregateRating={false}
                    numOfStars={ 5 }
                  />
                </div>

              </div>
            )}


              <div className='rate-text'>{rate.text || 'هنوز متنی برای این دیدگاه درج نشده است'}</div>
              <div className="rate-vote">
                <div className="rate-vote-plus each-rate-vote">
                  <span className="pinteb-icon icon-caret-up" onClick={() => sendingVote(rate._id,  'plus')}></span>
                  <i>{rate.votes.plus}</i>
                </div>
                <div className="rate-vote-minus each-rate-vote">
                  <span className="pinteb-icon icon-caret-down" onClick={() => sendingVote(rate._id,  'minus')}></span>
                  <i>{rate.votes.minus}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {rate.reply && (
          <div className="center-rate reply-rate">
            <div className='rate-img'>
              {rate.reply.user.pic ? (<img src={`${ RU }/pic/orginal/${ rate.reply.user.pic }`} alt={ rate.reply.user.familyName }/>) : ( <img src='../img/default/default-user.svg' alt={rate.reply.user.familyName}/>)}
            </div>
            <div className='rate-rate-text' >
              <div className='rate-rate'>
                <div className='rate-text-detail'>
                  <div className='rate-name'>{rate.reply.user.name} {rate.reply.user.familyName}</div>

                </div>
                <div className='rate-text'>{rate.reply.text || 'هنوز متنی برای این دیدگاه درج نشده است'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>

</div>
)}

export default ShowingRateInCenterPick;
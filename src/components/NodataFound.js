import React from 'react'
import { GlobalErrorMessages} from '../config/messages'


const NoDataFound = (props) => {
  let message = GlobalErrorMessages[props.msg].replace(/<<(.*?)>>/, props.keyword)
  return (
    <div className="search-result container">
      <div className="search-auto">
        <div className="search-result">
          <section className="section-we-made-1">
            <div className="m-t-50 color-black-1 text-center">
              <div dangerouslySetInnerHTML={{ __html: message }}/>
            </div>
          </section>
        </div>
      </div>
    </div>
  )

};
export default NoDataFound;




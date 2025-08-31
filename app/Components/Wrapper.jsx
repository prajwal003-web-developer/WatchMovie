
import React from 'react'
import Details from './Details'

const Wrapper = ({ children }) => {
    return (
        <div>
            {children}
            <Details/>
        </div>
    )
}

export default Wrapper
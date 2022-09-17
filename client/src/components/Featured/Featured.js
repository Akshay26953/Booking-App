import React from 'react'
import useFetch from '../../hooks/useFetch'
import './Featured.css'

function Featured() {

    const {data, loading, error} = useFetch("/hotels/countbycity?cities=berlin,madrid,london");

  return (
    <div className='featured'>
        {loading? ("Loading please wait..."):(<><div className="featuredItem">
            <img src="https://pix10.agoda.net/hotelImages/7791800/-1/306ac8dae383b95c6df6384ed859e605.jpg?ca=10&ce=1&s=1024x768" className='featuredImg' alt="" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h3>{data[0]} properties</h3>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://pix10.agoda.net/hotelImages/7791800/-1/306ac8dae383b95c6df6384ed859e605.jpg?ca=10&ce=1&s=1024x768" className='featuredImg' alt="" />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h3>{data[1]} properties</h3>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://pix10.agoda.net/hotelImages/7791800/-1/306ac8dae383b95c6df6384ed859e605.jpg?ca=10&ce=1&s=1024x768" className='featuredImg' alt="" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h3>{data[2]} properties</h3>
            </div>
        </div></>)}
    </div>
  )
}

export default Featured
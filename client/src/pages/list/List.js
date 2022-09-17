import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SearchItem from "../../components/SearchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./List.css";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

  const handleClick = ()=>{
    reFetch();
  }
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
          <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label>Destination</label>
              <input className="listItemDest" type="text" placeholder={destination}/>
            </div>
            <div className="listItem">
              <label>Check-in Date</label>
              {/* <input type="text" /> */}
              <span className="listItemDate" onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
              onChange={item=> setDates([item.selection])} minDate={new Date()} ranges={dates} 
              // rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}      
              />}
            </div>
            <div className="listItem">
              <label >Options</label>
              <div className="listOptions">
              <div className="listOptionItem">
                <span className="listOptionText">Min Price <small>per night</small></span>
              <input type="number" onChange={e=>setMin(e.target.value)}  min={0} className="listOptionNumber"/>
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Max Price <small>per night</small></span>
              <input type="number"  onChange={e=>setMax(e.target.value)}  min={0} className="listOptionNumber"/>
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Adult </span>
              <input type="number" min={1}  className="listOptionNumber" placeholder={options.adult}/>
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Children</span>
              <input type="number" min={0} className="listOptionNumber"  placeholder={options.children}/>
              </div>
              <div className="listOptionItem">
                <span className="listOptionText">Room</span>
              <input type="number" min={1}  className="listOptionNumber" placeholder={options.room}/>
              </div>
              </div>
              <button className="listButton" onClick={handleClick} >Search</button>
            </div>
            
          </div>
          <div className="listResult">
            {loading? ("Loading please wait...") : (data.map((item) => {
              return <SearchItem item={item} key={item._id} />}))}
          </div>
        </div>
      </div>
    </>
  );
}

export default List;

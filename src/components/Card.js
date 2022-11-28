import React from "react";

export default function Card(props){
    return (
        <div className='card'>
          <img src={`../images/${props.location.imageUrl}`} alt=""></img> 
          <div className='card-text'>
            <div className='country'>
              <p className='country-name'>{props.location.location}</p>
              <p className='country-map' href={props.location.googleMapsUrl} >View on Google Maps</p>
            </div>          
            
            <h1 className='place'>{props.location.title}</h1>
            <p className='date'>{props.location.startDate} - {props.location.endDate}</p>
            <p className='description'>{props.location.description}</p>
          </div>
        </div>
    );
}

// {/* <div className='card'>
// <img src="/images/syd_opr.png" alt=""></img>
// <div className='card-text'>
//   <div className='country'>
//     <p className='country-name'>AUSTRALIA</p>
//     <p className='country-map'>View on Google Maps</p>
//   </div>          
  
//   <h1 className='place'>Sydney Opera House</h1>
//   <p className='date'>27 May, 2021 - 8 Jun, 2021</p>
//   <p className='description'>The Sydney Opera House is a multi-venue performing arts centre in Sydney. Located on the banks of the Sydney Harbour, it is often regarded as one of the 20th century's most famous and distinctive buildings</p>
// </div>
// </div> */}

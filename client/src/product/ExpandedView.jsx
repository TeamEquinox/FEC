import React, { useState, useEffect, Component } from 'react';
import ReactDom from 'react-dom';
import {RxCross1} from 'react-icons/Rx';

function ExpandedView({ setShowModal, largeImage }) {

  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')

  const zoomIn = (e) => {
    console.log('zoomed')
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setBackgroundPosition({ backgroundPosition: `${x}% ${y}%` })
  }

  return (
    <div className="div__expandedview" onMouseMove={(e) => (zoomIn(e))} style={{backgroundPosition: backgroundPosition}}>
      <RxCross1 className="rxCross1" onClick={() => { setShowModal(false); }}/>
      {/* <img className="img__expandedview" src={largeImage} onMouseOver={()=>{zoomIn()}} /> */}
      <img className="img__expandedview" src={largeImage}/>



    </div>
  );
}


// class ExpandedView extends Component {
//   state = {
//     // backgroundImage: `url(${src})`,
//     backgroundPosition: '0% 0%'
//   }

//   handleMouseMove = e => {
//     const { left, top, width, height } = e.target.getBoundingClientRect()
//     const x = (e.pageX - left) / width * 100
//     const y = (e.pageY - top) / height * 100
//     this.setState({ backgroundPosition: `${x}% ${y}%` })
//   }

//   render ()  {
//     return (
//       <div className="div__expandedview" onMouseMove={this.handleMouseMove} style={this.state}>
//       <button onClick={() => { setShowModal(false); }}>close</button>

//       <img className="img__expandedview" src={this.props.largeImage}></img>
//       </div>

//     )


// }

// }

export default ExpandedView;

import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Parent from './related/Parent.jsx';

const App = () => {
  return (
    <div>
      <Parent/>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'));
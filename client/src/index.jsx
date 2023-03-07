import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const App = () => {
  return (
    <div>Hello World!</div>
  )
}

ReactDom.render(<App />, document.getElementById('root'));
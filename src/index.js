import React from 'react';
import ReactDOM from 'react-dom';
import Likert from './components/items/Likert/Likert';
import './index.css';

ReactDOM.render(<Likert description = "Item description" numberOfChoices = "7" />, document.getElementById('root'));

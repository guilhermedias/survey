import React from 'react';
import ReactDOM from 'react-dom';
import LikertGroup from './components/LikertGroup/LikertGroup';
import './index.css';

ReactDOM.render(<LikertGroup description = "Likert group description." numberOfChoices = "7" />, document.getElementById('root'));

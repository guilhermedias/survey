import React from 'react';
import ReactDOM from 'react-dom';
import LikertItem from './components/LikertItem/LikertItem';
import './index.css';

ReactDOM.render(<LikertItem statement = "Item statement" numberOfChoices = "7" />, document.getElementById('root'));

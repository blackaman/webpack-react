import './app.scss';
import React from 'react';
import { render } from 'react-dom';
import Router from './test';

const ele = document.createElement('div');
document.body.appendChild(ele);

render(<Router />, ele);

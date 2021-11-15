import React from 'react'; // 리액트의 사용을 위해 import
import ReactDOM from 'react-dom';  // 리액트 DOM의 사용을 위해
import './index.css'; // css import 
import AppRouter from './AppRoute';  // AppRoute 컴포넌트 import 
import reportWebVitals from './reportWebVitals';  // 지금은 무시해도됨

ReactDOM.render(  // ReactDOM이 내부의 컴포넌트들을 'root' 엘리먼트에 render함
  <React.StrictMode>
    <AppRouter />  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

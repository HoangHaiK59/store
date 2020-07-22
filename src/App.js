import React from 'react';
import './App.css';
import Container from './container';

function App() {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  React.useEffect(() => {
    listenToScrollEvent();
  })

  function calScrollDistance() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = getDocHeight();
    const  totalDocScrollLength  =  docHeight  -  windowHeight ;
    const  scrollPostion  =  Math.floor(scrollTop  /  totalDocScrollLength  *  100);
    setScrollPosition(scrollPostion)
  }

  function getDocHeight () {
    return Math.max(
      document.body.scrollHeight,  document.documentElement.scrollHeight,
      document.body.offsetHeight,  document.documentElement.offsetHeight,
      document.body.clientHeight,  document.documentElement.clientHeight
    );
  }

  function listenToScrollEvent () {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
          calScrollDistance();
      })
    })
  }
  return (
    <Container scrollPosition={scrollPosition}/>
  );
}

export default App;

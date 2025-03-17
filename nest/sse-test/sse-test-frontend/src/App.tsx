import { useEffect } from 'react';
import React from 'react';
function App() {

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/stream');
    eventSource.onmessage = ({ data }) => {
      console.log('New message', JSON.parse(data));
    };
  }, []);

  return (<div>hello</div>)

}

export default App;
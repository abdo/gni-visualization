import GNIdata from 'data/GNIdata.csv';
import useLineChart from 'hooks/useLineChart';
import { useRef } from 'react';

const App = () => {
  const containerRef = useRef();

  useLineChart({ containerRef, data: GNIdata, width: window.innerWidth / 2 });

  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
      <div ref={containerRef} />
    </div>
  );
};

export default App;

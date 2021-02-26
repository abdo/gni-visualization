import { Container } from './style';
import GNIdata from 'data/GNIdata.csv';
import useLineChart from 'hooks/useLineChart';
import { useRef } from 'react';

const App = () => {
  const chartContainerRef = useRef();

  useLineChart({
    containerRef: chartContainerRef,
    data: GNIdata,
    width: window.innerWidth / 2,
    uniqueColumn: 'Country Name',
    chosenRowId: 'World',
  });

  return (
    <Container>
      <div ref={chartContainerRef} />
    </Container>
  );
};

export default App;

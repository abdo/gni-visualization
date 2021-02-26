import { useEffect, useRef, useState } from 'react';

import { Container } from './style';
import GNIdata from 'data/GNIdata.csv';
import useLineChart from 'hooks/useLineChart';

const App = () => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth / 2);

  useEffect(() => {
    window.onresize = () => {
      setChartWidth(
        window.innerWidth < 800
          ? window.innerWidth * 0.9
          : window.innerWidth / 2
      );
    };
  }, []);
  const chartContainerRef = useRef();

  const { availableDates, rowIds } = useLineChart({
    containerRef: chartContainerRef,
    data: GNIdata,
    width: chartWidth,
    uniqueColumn: 'Country Name',
    chosenRowId: 'World',
  });

  console.log('availableDates :>> ', availableDates);
  console.log('rowIds :>> ', rowIds);

  return (
    <Container>
      <div ref={chartContainerRef} />
    </Container>
  );
};

export default App;

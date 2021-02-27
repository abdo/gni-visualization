import * as chartConfigActions from 'store/chartConfig/actions';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { Container } from './style';
import CountrySelector from 'components/CountrySelector';
import GNIdata from 'data/GNIdata.csv';
import useLineChart from 'hooks/useLineChart';

const App = () => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth / 2);

  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);

  const chartConfig = useSelector((state) => state.chartConfig);
  const dispatch = useDispatch();

  const chosenArea = chartConfig.area;

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
    chosenRowId: chosenArea,
    startYear,
    endYear,
  });

  const onChangeChosenArea = (area) => {
    dispatch(chartConfigActions.setChosenArea({ area }));
  };

  return (
    <Container>
      <div ref={chartContainerRef} />

      <CountrySelector
        chosenArea={chosenArea}
        setChosenArea={onChangeChosenArea}
        countries={rowIds}
      />
    </Container>
  );
};

export default App;

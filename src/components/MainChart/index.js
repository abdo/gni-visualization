import * as chartConfigActions from 'store/chartConfig/actions';

import { Container, Heading } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import CountrySelector from 'components/CountrySelector';
import GNIdata from 'data/GNIdata.csv';
import YearsRangeSelector from 'components/YearsRangeSelector';
import useLineChart from 'hooks/useLineChart';

const App = () => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth / 2);

  const chartConfig = useSelector((state) => state.chartConfig);
  const dispatch = useDispatch();

  const chosenArea = chartConfig.area;
  const startYear = chartConfig.startYear;
  const endYear = chartConfig.endYear;

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

  const onChangeChosenYearRange = (range) => {
    dispatch(chartConfigActions.setChosenYearRange({ range }));
  };

  return (
    <Container width={chartWidth}>
      <Heading>GNI per capita, Atlas method (current US$)</Heading>
      <div ref={chartContainerRef} />

      <CountrySelector
        chosenArea={chosenArea}
        setChosenArea={onChangeChosenArea}
        countries={rowIds}
      />

      <YearsRangeSelector
        years={availableDates}
        setChosenRange={onChangeChosenYearRange}
      />
    </Container>
  );
};

export default App;

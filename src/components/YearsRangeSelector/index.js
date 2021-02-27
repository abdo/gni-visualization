import { Container, InputNumber } from './style';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import React from 'react';

const YearsRangeSelector = ({ years, setChosenRange }) => {
  const minYear = Number(years[0]) || 0;
  const maxYear = Number(years[years.length - 1]) || 0;

  const [localRange, setLocalRange] = useState([minYear, maxYear]);

  useEffect(() => {
    setLocalRange([minYear, maxYear]);
  }, [minYear, maxYear]);

  return (
    <Container>
      <h3>Zoom through years:</h3>
      From
      <InputNumber
        size='large'
        value={localRange[0]}
        onChange={(value) => setLocalRange([value, localRange[1]])}
      />
      To
      <InputNumber
        size='large'
        value={localRange[1]}
        onChange={(value) => setLocalRange([localRange[0], value])}
      />
      <Button type='primary' onClick={() => setChosenRange(localRange)}>
        Go
      </Button>
    </Container>
  );
};

YearsRangeSelector.defaultProps = {
  startYear: null,
  endYear: null,
  years: [],
};

export default YearsRangeSelector;

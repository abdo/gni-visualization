import { useEffect, useState } from 'react';

import addAxes from './addAxes';
import addLine from './addLine';
import clippath from './clippath';
import handleFocus from './handleFocus';

const useLineChart = ({
  containerRef,
  data,
  width: passedWidth = 460,
  uniqueColumn,
  chosenRowId,
  startYear,
  endYear,
}) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [rowIds, setRowIds] = useState([]);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = passedWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    d3.select('#line-chart-svg').remove();

    // Append new svg
    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'line-chart-svg')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    setAvailableDates([]);
    setRowIds([]);

    //Read the data
    d3.csv(data).then((allData) => {
      const availableRowIds = allData
        .filter((row) => row[uniqueColumn])
        // filter rows with few data
        .filter(
          (row) =>
            Object.values(row).length -
              Object.values(row).filter((value) => value).length <
            10
        )
        .map((row) => row[uniqueColumn]);
      setRowIds(availableRowIds);

      const chosenRow = allData.find(
        (row) => row[uniqueColumn] === chosenRowId
      );
      const dates = Object.entries(chosenRow).filter(
        (columnData) =>
          columnData.every((value) => value) &&
          !Number.isNaN(Number(columnData[0])) &&
          (!startYear || columnData[0] >= startYear) &&
          (!endYear || columnData[0] <= endYear)
      );

      const data = dates.map((columnData) => {
        const year = d3.timeParse('%Y')(columnData[0]);
        return {
          date: year,
          value: columnData[1],
        };
      });

      setAvailableDates(dates.map((date) => date[0]));

      const { x, y } = addAxes({ svg, data, width, height });

      clippath({ svg, width, height });

      const line = addLine({ svg, data, x, y });

      handleFocus({ svg, line, width, height, data, x, y });
    });
  }, [chosenRowId, passedWidth, startYear, endYear]);

  return { availableDates, rowIds };
};

export default useLineChart;

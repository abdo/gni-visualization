import { Container, Select } from './style';

import React from 'react';

const { Option } = Select;

const CountrySelector = ({ chosenArea, setChosenArea, countries }) => {
  return (
    <Container>
      <h3>Choose country:</h3>
      <Select
        showSearch
        placeholder='Select a country'
        optionFilterProp='children'
        onChange={setChosenArea}
        value={chosenArea}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {countries.map((country) => (
          <Option value={country} key={country}>
            {country}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

CountrySelector.defaultProps = {
  chosenArea: '',
  setChosenArea: () => null,
  countries: [],
};

export default CountrySelector;

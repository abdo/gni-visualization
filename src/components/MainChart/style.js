import { Select as antSelect } from 'antd';
import { devices } from 'style/constants';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
  margin: 50px auto 0;
  width: ${({ width }) => `${width}px`};

  svg {
    overflow: visible;

    & .focusArea {
      & .descContainer {
        fill: ${({ theme }) => theme.colors.main};
      }
      & .desc {
        stroke: ${({ theme }) => theme.colors.white};
        font-weight: 300;
      }
    }

    & .x-axis {
      text {
        @media ${devices.mobile} {
          display: none;
        }
      }
    }
  }
`;

export const Select = styled(antSelect)`
  width: 200px;
`;

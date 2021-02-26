import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;

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
  }
`;

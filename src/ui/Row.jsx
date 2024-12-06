import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 30px;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// The below is a feature of React to set default props
Row.defaultProps = {
  type: "vertical",
};
export default Row;

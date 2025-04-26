import styled from "@emotion/styled";
import { colors } from "shared/const";

const inputStyles = `
  padding: 5px 10px;
  border: 1px solid ${colors.white};
  border-radius: 5px;
`;

const SInput = styled.input`
  ${inputStyles}
`;

const SSelect = styled.select`
  ${inputStyles}
`;

const STextarea = styled.textarea`
  ${inputStyles}
`;

const SLabel = styled.label`
  margin: 10px 0 5px;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SButtonContainer = styled.div`
  margin-block-start: 30px;
`;

export {
  inputStyles,
  SInput,
  SSelect,
  STextarea,
  SLabel,
  SContainer,
  SButtonContainer,
};

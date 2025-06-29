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

export { inputStyles, SInput, SSelect, STextarea };

import styled from "@emotion/styled";
import { colors } from "shared/const";
import { ComboboxInput as ReachComboboxInput } from "@reach/combobox";

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

const SReachComboboxInput = styled(ReachComboboxInput)`
  width: 100%;
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
  margin-top: 30px;
`;

export {
  inputStyles,
  SInput,
  SSelect,
  STextarea,
  SReachComboboxInput,
  SLabel,
  SContainer,
  SButtonContainer,
};

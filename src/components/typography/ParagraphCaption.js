import styled from 'styled-components';
import constants from '../../styles/style-constants';

export const ParagraphCaption = styled.p`
  font-size: ${constants.fontSize.small}px;
  color: ${constants.textColor.medium};
  line-height: 1.25;
  margin-top: 0;

  & + & {
    margin-top: ${constants.baseModule * 0.5}px;
  }
`;

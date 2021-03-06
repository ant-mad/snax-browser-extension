import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Wrapper, Icon, Text } from './styles';

const propTypes = {
  icon: PropTypes.element,
  text: PropTypes.oneOf(PropTypes.string, PropTypes.element),
};

const defaultProps = {
  icon: null,
  text: '',
};

export const Tag = ({ icon, text, ...props }) => (
  <Wrapper {...props}>
    <Icon>{icon}</Icon>
    <Text>{text}</Text>
  </Wrapper>
);

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

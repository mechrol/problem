import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

const AlertContainer = styled.div`
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'warning': return '#fff3cd';
      case 'danger': return '#f8d7da';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'warning': return '#856404';
      case 'danger': return '#721c24';
      default: return '#0c5460';
    }
  }};
`;

const IconWrapper = styled.div`
  font-size: 1.25rem;
  margin-top: 0.125rem;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AlertMessage = styled.div`
  font-size: 0.9375rem;
`;

const Alert = ({ type = 'info', title, children }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'danger': return <FaExclamationCircle />;
      default: return <FaInfoCircle />;
    }
  };
  
  return (
    <AlertContainer type={type}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage>{children}</AlertMessage>
      </AlertContent>
    </AlertContainer>
  );
};

export default Alert;

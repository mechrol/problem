import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: ${props => props.flat ? 'none' : 'var(--box-shadow)'};
  border: ${props => props.flat ? '1px solid #eaeaea' : 'none'};
  padding: ${props => props.padding || '1.5rem'};
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardContent = styled.div``;

const Card = ({ 
  title, 
  icon, 
  children, 
  flat = false, 
  padding, 
  marginBottom 
}) => {
  return (
    <CardContainer 
      flat={flat} 
      padding={padding} 
      marginBottom={marginBottom}
    >
      {title && (
        <CardTitle>
          {icon && icon}
          {title}
        </CardTitle>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;

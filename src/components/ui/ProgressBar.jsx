import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: var(--primary-color);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <Progress progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;

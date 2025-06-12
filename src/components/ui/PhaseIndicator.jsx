import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const PhaseIndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #e0e0e0;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    
    &::before {
      display: none;
    }
  }
`;

const Phase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const PhaseCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => 
    props.active ? 'var(--primary-color)' : 
    props.completed ? 'var(--success-color)' : 
    'white'};
  border: 2px solid ${props => 
    props.active ? 'var(--primary-color)' : 
    props.completed ? 'var(--success-color)' : 
    '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active || props.completed) ? 'white' : 'var(--gray-color)'};
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
`;

const PhaseName = styled.span`
  font-size: 0.875rem;
  color: ${props => 
    props.active ? 'var(--primary-color)' : 
    props.completed ? 'var(--success-color)' : 
    'var(--gray-color)'};
  font-weight: ${props => (props.active || props.completed) ? '600' : '400'};
`;

const PhaseIndicator = ({ phases, currentPhase }) => {
  return (
    <PhaseIndicatorContainer>
      {phases.map((phase, index) => (
        <Phase key={index}>
          <PhaseCircle 
            active={index === currentPhase} 
            completed={index < currentPhase}
          >
            {index < currentPhase ? <FaCheck /> : index + 1}
          </PhaseCircle>
          <PhaseName 
            active={index === currentPhase} 
            completed={index < currentPhase}
          >
            {phase.name} Phase
          </PhaseName>
        </Phase>
      ))}
    </PhaseIndicatorContainer>
  );
};

export default PhaseIndicator;

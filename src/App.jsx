import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCheck, FaTimes, FaFileAlt, FaDownload } from 'react-icons/fa';
import styled from 'styled-components';
import DiagnosticPhase from './components/phases/DiagnosticPhase';
import SearchingPhase from './components/phases/SearchingPhase';
import DecisionPhase from './components/phases/DecisionPhase';
import EvaluationPhase from './components/phases/EvaluationPhase';
import ProgressBar from './components/ui/ProgressBar';
import PhaseIndicator from './components/ui/PhaseIndicator';
import ReportGenerator from './components/ReportGenerator';
import { TroubleshootingProvider } from './context/TroubleshootingContext';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--dark-color);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: var(--gray-color);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const PhaseContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  color: ${props => props.primary ? 'white' : 'var(--dark-color)'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #27ae60;
  }
  
  @media (max-width: 768px) {
    position: static;
    margin-top: 1rem;
    width: 100%;
    justify-content: center;
  }
`;

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const phases = [
    { name: 'Diagnostic', component: DiagnosticPhase },
    { name: 'Searching', component: SearchingPhase },
    { name: 'Decision', component: DecisionPhase },
    { name: 'Evaluation', component: EvaluationPhase }
  ];
  
  useEffect(() => {
    // Calculate progress based on current phase
    setProgress((currentPhase / (phases.length - 1)) * 100);
  }, [currentPhase, phases.length]);
  
  const handleNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const toggleReport = () => {
    setShowReport(!showReport);
  };
  
  const CurrentPhaseComponent = phases[currentPhase].component;
  
  return (
    <TroubleshootingProvider>
      <AppContainer>
        <Header>
          <Title>Troubleshooting Process Application</Title>
          <Subtitle>
            A systematic approach to identify, analyze, and solve organizational problems
            through a structured four-phase process.
          </Subtitle>
        </Header>
        
        <ProgressBar progress={progress} />
        <PhaseIndicator phases={phases} currentPhase={currentPhase} />
        
        <PhaseContainer>
          <CurrentPhaseComponent />
          
          <ButtonContainer>
            <Button onClick={handlePrevious} disabled={currentPhase === 0}>
              <FaArrowRight style={{ transform: 'rotate(180deg)' }} /> Previous
            </Button>
            
            {currentPhase < phases.length - 1 ? (
              <Button primary onClick={handleNext}>
                Next <FaArrowRight />
              </Button>
            ) : (
              <Button primary onClick={toggleReport}>
                Complete <FaCheck />
              </Button>
            )}
          </ButtonContainer>
        </PhaseContainer>
        
        <ReportButton onClick={toggleReport}>
          <FaFileAlt /> Generate Report
        </ReportButton>
        
        {showReport && <ReportGenerator onClose={toggleReport} />}
      </AppContainer>
    </TroubleshootingProvider>
  );
}

export default App;

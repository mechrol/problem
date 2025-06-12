import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaTimes, FaDownload, FaFileAlt } from 'react-icons/fa';
import { useTroubleshooting } from '../context/TroubleshootingContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-color);
  z-index: 10;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ReportHeader = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 30px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ReportTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
  }
`;

const ReportDate = styled.div`
  margin-top: 8px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ReportBody = styled.div`
  padding: 30px;
`;

const ReportSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--dark-color);
  border-bottom: 1px solid var(--light-gray-color);
  padding-bottom: 8px;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const FieldLabel = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--dark-color);
`;

const FieldValue = styled.div`
  color: var(--gray-color);
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

const ReportGenerator = ({ isOpen, onClose }) => {
  const { diagnosticPhase, searchPhase, decisionPhase, assessmentPhase } = useTroubleshooting();
  const reportRef = useRef(null);
  
  if (!isOpen) return null;
  
  const formatDate = (date) => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleDownload = () => {
    // Implementation for PDF download would go here
    // This would typically use a library like html2pdf or jsPDF
    alert('PDF download functionality would be implemented here.');
  };
  
  return (
    <ModalOverlay>
      <ModalContent ref={reportRef}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <ReportHeader>
          <ReportTitle>
            <FaFileAlt />
            Troubleshooting Process Report
          </ReportTitle>
          <ReportDate>Generated on {formatDate(new Date())}</ReportDate>
        </ReportHeader>
        
        <ReportBody>
          <ReportSection>
            <SectionTitle>1. Diagnostic Phase</SectionTitle>
            <SectionContent>
              <FieldGroup>
                <FieldLabel>Problem Definition</FieldLabel>
                <FieldValue>{diagnosticPhase.problemDefinition || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Environmental Changes</FieldLabel>
                <FieldValue>{diagnosticPhase.environmentChanges || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Economic Situation</FieldLabel>
                <FieldValue>{diagnosticPhase.economicSituation || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Management Recommendations</FieldLabel>
                <FieldValue>{diagnosticPhase.managementRecommendations || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Analysis Results</FieldLabel>
                <FieldValue>{diagnosticPhase.analysisResults || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Deviation Symptoms</FieldLabel>
                <FieldValue>{diagnosticPhase.deviationSymptoms || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Worth Investigating?</FieldLabel>
                <FieldValue>
                  {diagnosticPhase.isWorthInvestigating === null
                    ? 'Not determined'
                    : diagnosticPhase.isWorthInvestigating
                      ? 'Yes, worth investigating'
                      : 'No, investigation halted'}
                </FieldValue>
              </FieldGroup>
              
              {diagnosticPhase.isWorthInvestigating && (
                <>
                  <FieldGroup>
                    <FieldLabel>Diagnostic Techniques Used</FieldLabel>
                    <FieldValue>
                      {diagnosticPhase.diagnosticTechniques && diagnosticPhase.diagnosticTechniques.length > 0
                        ? diagnosticPhase.diagnosticTechniques.join(', ')
                        : 'None selected'}
                    </FieldValue>
                  </FieldGroup>
                  
                  <FieldGroup>
                    <FieldLabel>Study Results</FieldLabel>
                    <FieldValue>{diagnosticPhase.studyResults || 'Not provided'}</FieldValue>
                  </FieldGroup>
                  
                  <FieldGroup>
                    <FieldLabel>Problem Solution Card</FieldLabel>
                    <FieldValue>{diagnosticPhase.problemSolutionCard || 'Not provided'}</FieldValue>
                  </FieldGroup>
                </>
              )}
            </SectionContent>
          </ReportSection>
          
          <ReportSection>
            <SectionTitle>2. Search Phase</SectionTitle>
            <SectionContent>
              <FieldGroup>
                <FieldLabel>Test Determination</FieldLabel>
                <FieldValue>{searchPhase.testDetermination || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Selected Techniques</FieldLabel>
                <FieldValue>
                  {searchPhase.selectedTechniques && searchPhase.selectedTechniques.length > 0
                    ? searchPhase.selectedTechniques.join(', ')
                    : 'None selected'}
                </FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Creative Thinking Approach</FieldLabel>
                <FieldValue>{searchPhase.creativeThinking || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Information Gathering Results</FieldLabel>
                <FieldValue>{searchPhase.informationGathering || 'Not provided'}</FieldValue>
              </FieldGroup>
            </SectionContent>
          </ReportSection>
          
          <ReportSection>
            <SectionTitle>3. Decision Phase</SectionTitle>
            <SectionContent>
              <FieldGroup>
                <FieldLabel>Solution Evaluation</FieldLabel>
                <FieldValue>{decisionPhase.solutionEvaluation || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Rational Solution Verification</FieldLabel>
                <FieldValue>{decisionPhase.rationalVerification || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>New Organization Design</FieldLabel>
                <FieldValue>{decisionPhase.organizationDesign || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Project Approval</FieldLabel>
                <FieldValue>
                  {decisionPhase.isApproved === null
                    ? 'Not determined'
                    : decisionPhase.isApproved
                      ? 'Project approved'
                      : 'Project not approved'}
                </FieldValue>
              </FieldGroup>
            </SectionContent>
          </ReportSection>
          
          <ReportSection>
            <SectionTitle>4. Assessment Phase</SectionTitle>
            <SectionContent>
              <FieldGroup>
                <FieldLabel>Implementation Plan</FieldLabel>
                <FieldValue>{assessmentPhase.implementationPlan || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Supervision Approach</FieldLabel>
                <FieldValue>{assessmentPhase.supervisionApproach || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Functionality Verification</FieldLabel>
                <FieldValue>{assessmentPhase.functionalityVerification || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Effect Evaluation</FieldLabel>
                <FieldValue>{assessmentPhase.effectEvaluation || 'Not provided'}</FieldValue>
              </FieldGroup>
              
              <FieldGroup>
                <FieldLabel>Implementation Status</FieldLabel>
                <FieldValue>
                  {assessmentPhase.implementationStatus || 'Not started'}
                </FieldValue>
              </FieldGroup>
            </SectionContent>
          </ReportSection>
          
          <DownloadButton onClick={handleDownload}>
            <FaDownload />
            Download PDF Report
          </DownloadButton>
        </ReportBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReportGenerator;

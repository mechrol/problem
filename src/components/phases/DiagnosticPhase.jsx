import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaClipboardCheck, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import { FormSection, Input, Textarea, RadioGroup, CheckboxGroup } from '../ui/FormElements';
import { useTroubleshooting } from '../../context/TroubleshootingContext';

const PhaseTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
`;

const PhaseDescription = styled.p`
  color: var(--gray-color);
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const DiagnosticPhase = () => {
  const { diagnosticPhase, updateDiagnosticPhase } = useTroubleshooting();
  
  const handleInputChange = (e) => {
    updateDiagnosticPhase({ [e.target.id]: e.target.value });
  };
  
  const handleRadioChange = (e) => {
    updateDiagnosticPhase({ isWorthInvestigating: e.target.value === 'yes' });
  };
  
  const handleCheckboxChange = (techniques) => {
    updateDiagnosticPhase({ diagnosticTechniques: techniques });
  };
  
  const diagnosticTechniqueOptions = [
    { value: 'interviews', label: 'Interviews with stakeholders' },
    { value: 'surveys', label: 'Surveys and questionnaires' },
    { value: 'dataAnalysis', label: 'Data analysis and statistics' },
    { value: 'processMapping', label: 'Process mapping' },
    { value: 'rootCauseAnalysis', label: 'Root cause analysis' },
    { value: 'swotAnalysis', label: 'SWOT analysis' },
    { value: 'benchmarking', label: 'Benchmarking against industry standards' },
    { value: 'fishboneDiagram', label: 'Fishbone diagram' }
  ];
  
  return (
    <div>
      <PhaseTitle>Phase 1: Diagnostic</PhaseTitle>
      <PhaseDescription>
        In this phase, we define the problem, determine if it's worth investigating,
        and conduct initial studies using appropriate diagnostic techniques.
      </PhaseDescription>
      
      <Card 
        title="Input Data Collection" 
        icon={<FaClipboardCheck />}
      >
        <FormSection
          title="Environmental and Situational Factors"
          description="Provide information about the context in which the problem exists."
        >
          <Textarea
            label="Changes in the Environment"
            id="environmentChanges"
            value={diagnosticPhase.environmentChanges}
            onChange={handleInputChange}
            placeholder="Describe any recent changes in the external environment..."
            helpText="Consider market trends, regulatory changes, technological advancements, etc."
          />
          
          <Textarea
            label="Internal Economic Situation"
            id="economicSituation"
            value={diagnosticPhase.economicSituation}
            onChange={handleInputChange}
            placeholder="Describe the current internal economic situation..."
            helpText="Consider budget constraints, resource allocation, financial performance, etc."
          />
          
          <Textarea
            label="Management Recommendations"
            id="managementRecommendations"
            value={diagnosticPhase.managementRecommendations}
            onChange={handleInputChange}
            placeholder="List any recommendations from management..."
            helpText="Include directives, strategic goals, or specific requests from leadership."
          />
        </FormSection>
        
        <FormSection
          title="Analysis and Symptoms"
          description="Provide information about existing analyses and observed symptoms."
        >
          <Textarea
            label="Results of Own Analyses"
            id="analysisResults"
            value={diagnosticPhase.analysisResults}
            onChange={handleInputChange}
            placeholder="Summarize the results of any analyses you've conducted..."
            helpText="Include key findings, metrics, and insights from your own research."
          />
          
          <Textarea
            label="Symptoms of Deviation"
            id="deviationSymptoms"
            value={diagnosticPhase.deviationSymptoms}
            onChange={handleInputChange}
            placeholder="Describe the symptoms indicating a problem exists..."
            helpText="List observable signs that something is not functioning as expected."
          />
        </FormSection>
      </Card>
      
      <Card 
        title="Problem Definition" 
        icon={<FaSearch />}
      >
        <Alert type="info" title="Step 1: Define the Problem">
          Clearly articulate the problem based on the information collected above.
          Be specific about what's not working and the impact it's having.
        </Alert>
        
        <Textarea
          label="Problem Definition"
          id="problemDefinition"
          value={diagnosticPhase.problemDefinition}
          onChange={handleInputChange}
          placeholder="Define the problem in clear, specific terms..."
          helpText="A good problem statement identifies what, where, when, and the extent of the issue."
          required
          rows={6}
        />
        
        <RadioGroup
          label="Is this problem worth investigating?"
          name="worthInvestigating"
          options={[
            { value: 'yes', label: 'Yes, it\'s worth investigating' },
            { value: 'no', label: 'No, we should halt the investigation' }
          ]}
          value={diagnosticPhase.isWorthInvestigating === null ? '' : (diagnosticPhase.isWorthInvestigating ? 'yes' : 'no')}
          onChange={handleRadioChange}
          helpText="Consider the potential impact, resource requirements, and strategic importance."
          required
        />
        
        {diagnosticPhase.isWorthInvestigating === false && (
          <Alert type="warning" title="Investigation Halted">
            You've determined that this problem is not worth investigating further.
            You may still complete the form, but note that in a real scenario, the process would end here.
          </Alert>
        )}
        
        {diagnosticPhase.isWorthInvestigating === true && (
          <>
            <Alert type="success" title="Step 2: Conduct Studies">
              Select the diagnostic techniques you'll use to investigate this problem further.
            </Alert>
            
            <CheckboxGroup
              label="Select Diagnostic Techniques (Point A)"
              name="diagnosticTechniques"
              options={diagnosticTechniqueOptions}
              values={diagnosticPhase.diagnosticTechniques}
              onChange={handleCheckboxChange}
              helpText="Choose the most appropriate techniques for this specific problem."
              required
            />
            
            <Textarea
              label="Study Results"
              id="studyResults"
              value={diagnosticPhase.studyResults}
              onChange={handleInputChange}
              placeholder="Summarize the findings from your diagnostic studies..."
              helpText="Include key insights, data points, and conclusions from your investigation."
              rows={6}
            />
            
            <Textarea
              label="Problem Solution Card"
              id="problemSolutionCard"
              value={diagnosticPhase.problemSolutionCard}
              onChange={handleInputChange}
              placeholder="Document the problem and potential solution directions..."
              helpText="This will serve as a reference document for the next phases."
              rows={6}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default DiagnosticPhase;

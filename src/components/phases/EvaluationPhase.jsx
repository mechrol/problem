import React from 'react';
import styled from 'styled-components';
import { FaClipboardCheck, FaChartLine, FaUserCheck } from 'react-icons/fa';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import { FormSection, Textarea, RadioGroup, CheckboxGroup } from '../ui/FormElements';
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

const EvaluationPhase = () => {
  const { evaluationPhase, updateEvaluationPhase, decisionPhase } = useTroubleshooting();
  
  const handleInputChange = (e) => {
    updateEvaluationPhase({ [e.target.id]: e.target.value });
  };
  
  const handleRadioChange = (e, field) => {
    updateEvaluationPhase({ [field]: e.target.value === 'yes' });
  };
  
  const handleCheckboxChange = (values, field) => {
    updateEvaluationPhase({ [field]: values });
  };
  
  const handleNestedCheckboxChange = (values, parentField, childField) => {
    updateEvaluationPhase({
      [parentField]: {
        ...evaluationPhase[parentField],
        [childField]: values
      }
    });
  };
  
  const trainingTechniqueOptions = [
    { value: 'workshops', label: 'Workshops' },
    { value: 'seminars', label: 'Seminars' },
    { value: 'onTheJobTraining', label: 'On-the-job training' },
    { value: 'eLearning', label: 'E-learning modules' },
    { value: 'mentoring', label: 'Mentoring programs' },
    { value: 'simulationExercises', label: 'Simulation exercises' }
  ];
  
  const engineeringTechniqueOptions = [
    { value: 'processOptimization', label: 'Process optimization' },
    { value: 'qualityControl', label: 'Quality control procedures' },
    { value: 'standardOperatingProcedures', label: 'Standard operating procedures' },
    { value: 'technicalDocumentation', label: 'Technical documentation' },
    { value: 'systemIntegration', label: 'System integration' }
  ];
  
  const quantitativeEvaluationOptions = [
    { value: 'costBenefitAnalysis', label: 'Cost-benefit analysis' },
    { value: 'returnOnInvestment', label: 'Return on investment (ROI)' },
    { value: 'keyPerformanceIndicators', label: 'Key performance indicators (KPIs)' },
    { value: 'statisticalAnalysis', label: 'Statistical analysis' },
    { value: 'productivityMeasures', label: 'Productivity measures' }
  ];
  
  const valueBasedEvaluationOptions = [
    { value: 'customerSatisfaction', label: 'Customer satisfaction' },
    { value: 'employeeSatisfaction', label: 'Employee satisfaction' },
    { value: 'brandValue', label: 'Brand value' },
    { value: 'marketPosition', label: 'Market position' },
    { value: 'stakeholderPerception', label: 'Stakeholder perception' }
  ];
  
  const socialEvaluationOptions = [
    { value: 'socialImpactAssessment', label: 'Social impact assessment' },
    { value: 'communityEngagement', label: 'Community engagement' },
    { value: 'workLifeBalance', label: 'Work-life balance' },
    { value: 'diversityAndInclusion', label: 'Diversity and inclusion' },
    { value: 'corporateSocialResponsibility', label: 'Corporate social responsibility' }
  ];
  
  // Check if we should show this phase based on previous phases
  const showPhase = decisionPhase.isProjectApproved === true;
  
  if (!showPhase) {
    return (
      <div>
        <PhaseTitle>Phase 4: Evaluation</PhaseTitle>
        <Alert type="warning" title="Previous Phase Incomplete">
          The Evaluation Phase is only accessible after the project has been approved in the Decision Phase.
          Please complete the previous phase first.
        </Alert>
      </div>
    );
  }
  
  return (
    <div>
      <PhaseTitle>Phase 4: Evaluation</PhaseTitle>
      <PhaseDescription>
        In this final phase, we implement author supervision, assess whether the project
        is functioning as designed, and evaluate the economic and social effects.
      </PhaseDescription>
      
      <Card 
        title="Implementation Supervision" 
        icon={<FaUserCheck />}
      >
        <Alert type="info" title="Step 6: Implement Author Supervision">
          Describe how the implementation will be supervised and guided.
        </Alert>
        
        <Textarea
          label="Author Supervision"
          id="authorSupervision"
          value={evaluationPhase.authorSupervision}
          onChange={handleInputChange}
          placeholder="Describe how the implementation will be supervised..."
          helpText="Include details about oversight mechanisms, reporting structures, and quality control."
          rows={6}
          required
        />
        
        <Alert type="success" title="Point E: Use Training and Engineering Techniques">
          Select the techniques you'll use to support implementation.
        </Alert>
        
        <FormSection
          title="Implementation Support Techniques"
          description="Select the techniques you'll use to ensure successful implementation."
        >
          <CheckboxGroup
            label="Training Techniques"
            name="trainingTechniques"
            options={trainingTechniqueOptions}
            values={evaluationPhase.trainingTechniques}
            onChange={(values) => handleCheckboxChange(values, 'trainingTechniques')}
            helpText="Methods to prepare people for the new organization."
            required
          />
          
          <CheckboxGroup
            label="Engineering Techniques"
            name="engineeringTechniques"
            options={engineeringTechniqueOptions}
            values={evaluationPhase.engineeringTechniques}
            onChange={(values) => handleCheckboxChange(values, 'engineeringTechniques')}
            helpText="Technical methods to support implementation."
            required
          />
        </FormSection>
        
        <RadioGroup
          label="Is the project functioning according to the design?"
          name="functioningAsDesigned"
          options={[
            { value: 'yes', label: 'Yes, it functions as designed' },
            { value: 'no', label: 'No, there are discrepancies' }
          ]}
          value={evaluationPhase.isFunctioningAsDesigned === null ? '' : (evaluationPhase.isFunctioningAsDesigned ? 'yes' : 'no')}
          onChange={(e) => handleRadioChange(e, 'isFunctioningAsDesigned')}
          helpText="Assess whether the implemented solution is working as intended."
          required
        />
      </Card>
      
      {evaluationPhase.isFunctioningAsDesigned === true && (
        <Card 
          title="Effects Evaluation" 
          icon={<FaChartLine />}
        >
          <Alert type="info" title="Step 7: Evaluate Economic and Social Effects">
            Assess the outcomes and impacts of the implemented solution.
          </Alert>
          
          <Textarea
            label="Economic Effects"
            id="economicEffects"
            value={evaluationPhase.economicEffects}
            onChange={handleInputChange}
            placeholder="Describe the economic effects of the solution..."
            helpText="Include financial impacts, cost savings, revenue increases, efficiency gains, etc."
            rows={4}
            required
          />
          
          <Textarea
            label="Social Effects"
            id="socialEffects"
            value={evaluationPhase.socialEffects}
            onChange={handleInputChange}
            placeholder="Describe the social effects of the solution..."
            helpText="Include impacts on employees, customers, communities, and other stakeholders."
            rows={4}
            required
          />
          
          <Alert type="success" title="Point F: Use Evaluation Techniques">
            Select the techniques you'll use to evaluate the effects.
          </Alert>
          
          <FormSection
            title="Evaluation Techniques"
            description="Select the techniques you'll use to measure and assess outcomes."
          >
            <CheckboxGroup
              label="Quantitative Techniques"
              name="quantitativeTechniques"
              options={quantitativeEvaluationOptions}
              values={evaluationPhase.evaluationTechniques.quantitative}
              onChange={(values) => handleNestedCheckboxChange(values, 'evaluationTechniques', 'quantitative')}
              helpText="Methods to measure numerical outcomes."
              required
            />
            
            <CheckboxGroup
              label="Value-Based Techniques"
              name="valueBasedTechniques"
              options={valueBasedEvaluationOptions}
              values={evaluationPhase.evaluationTechniques.valueBasedTechniques}
              onChange={(values) => handleNestedCheckboxChange(values, 'evaluationTechniques', 'valueBasedTechniques')}
              helpText="Methods to assess qualitative value creation."
              required
            />
            
            <CheckboxGroup
              label="Social Techniques"
              name="socialTechniques"
              options={socialEvaluationOptions}
              values={evaluationPhase.evaluationTechniques.socialTechniques}
              onChange={(values) => handleNestedCheckboxChange(values, 'evaluationTechniques', 'socialTechniques')}
              helpText="Methods to evaluate social impacts."
              required
            />
          </FormSection>
          
          <RadioGroup
            label="Have positive effects been achieved?"
            name="positiveEffects"
            options={[
              { value: 'yes', label: 'Yes, positive effects have been achieved' },
              { value: 'no', label: 'No, the expected positive effects have not been achieved' }
            ]}
            value={evaluationPhase.positiveEffectsAchieved === null ? '' : (evaluationPhase.positiveEffectsAchieved ? 'yes' : 'no')}
            onChange={(e) => handleRadioChange(e, 'positiveEffectsAchieved')}
            helpText="Assess whether the solution has delivered the expected benefits."
            required
          />
          
          {evaluationPhase.positiveEffectsAchieved === true && (
            <Alert type="success" title="Process Complete">
              Congratulations! The troubleshooting process has been successfully completed,
              with positive effects achieved. You can now generate a final report.
            </Alert>
          )}
          
          {evaluationPhase.positiveEffectsAchieved === false && (
            <Alert type="warning" title="Process Requires Revision">
              The expected positive effects have not been achieved. Consider revisiting
              earlier phases to identify improvements or alternative solutions.
            </Alert>
          )}
        </Card>
      )}
    </div>
  );
};

export default EvaluationPhase;

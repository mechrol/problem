import React from 'react';
import styled from 'styled-components';
import { FaBalanceScale, FaCheckCircle, FaDraftingCompass } from 'react-icons/fa';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import { FormSection, Textarea, RadioGroup, CheckboxGroup, Input } from '../ui/FormElements';
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

const CriteriaContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const CriteriaItem = styled.div`
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  background-color: #f9f9f9;
`;

const CriteriaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CriteriaTitle = styled.div`
  font-weight: 600;
`;

const CriteriaActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CriteriaButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.delete ? 'var(--danger-color)' : 'var(--primary-color)'};
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AddCriteriaForm = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: var(--border-radius);
`;

const AddCriteriaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--light-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #dfe6e9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  cursor: pointer;
  
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  color: ${props => props.primary ? 'white' : 'var(--dark-color)'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : '#f5f5f5'};
  }
`;

const SolutionEvaluationContainer = styled.div`
  margin-top: 2rem;
`;

const SolutionEvaluationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #eaeaea;
  background-color: #f5f7fa;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eaeaea;
`;

const SolutionSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  background-color: white;
`;

const DecisionPhase = () => {
  const { decisionPhase, updateDecisionPhase, searchingPhase } = useTroubleshooting();
  const [showAddCriteria, setShowAddCriteria] = React.useState(false);
  const [newCriteria, setNewCriteria] = React.useState({ name: '', description: '', weight: 1 });
  
  const handleInputChange = (e) => {
    updateDecisionPhase({ [e.target.id]: e.target.value });
  };
  
  const handleRadioChange = (e, field) => {
    updateDecisionPhase({ [field]: e.target.value === 'yes' });
  };
  
  const handleCheckboxChange = (values, field) => {
    updateDecisionPhase({ [field]: values });
  };
  
  const handleNewCriteriaChange = (e) => {
    const value = e.target.name === 'weight' ? parseInt(e.target.value) || 1 : e.target.value;
    setNewCriteria({ ...newCriteria, [e.target.name]: value });
  };
  
  const addCriteria = () => {
    if (newCriteria.name.trim()) {
      const updatedCriteria = [
        ...decisionPhase.evaluationCriteria,
        { ...newCriteria, id: Date.now() }
      ];
      updateDecisionPhase({ evaluationCriteria: updatedCriteria });
      setNewCriteria({ name: '', description: '', weight: 1 });
      setShowAddCriteria(false);
    }
  };
  
  const removeCriteria = (id) => {
    const updatedCriteria = decisionPhase.evaluationCriteria.filter(
      criteria => criteria.id !== id
    );
    updateDecisionPhase({ evaluationCriteria: updatedCriteria });
  };
  
  const handleSolutionSelection = (e) => {
    updateDecisionPhase({ selectedSolution: e.target.value });
  };
  
  const graphicTechniqueOptions = [
    { value: 'flowcharts', label: 'Flowcharts' },
    { value: 'organizationalCharts', label: 'Organizational charts' },
    { value: 'processFlowDiagrams', label: 'Process flow diagrams' },
    { value: 'ganttCharts', label: 'Gantt charts' },
    { value: 'networkDiagrams', label: 'Network diagrams' },
    { value: 'dataFlowDiagrams', label: 'Data flow diagrams' }
  ];
  
  const descriptiveTechniqueOptions = [
    { value: 'functionalDescriptions', label: 'Functional descriptions' },
    { value: 'jobDescriptions', label: 'Job descriptions' },
    { value: 'procedureManuals', label: 'Procedure manuals' },
    { value: 'workInstructions', label: 'Work instructions' },
    { value: 'policyDocuments', label: 'Policy documents' }
  ];
  
  const modelOptions = [
    { value: 'physicalModels', label: 'Physical models' },
    { value: 'digitalModels', label: 'Digital models' },
    { value: 'simulationModels', label: 'Simulation models' },
    { value: 'mathematicalModels', label: 'Mathematical models' }
  ];
  
  const mockupOptions = [
    { value: 'interfaceMockups', label: 'Interface mockups' },
    { value: 'prototypes', label: 'Prototypes' },
    { value: 'proofOfConcepts', label: 'Proof of concepts' }
  ];
  
  return (
    <div>
      <PhaseTitle>Phase 3: Decision</PhaseTitle>
      <PhaseDescription>
        In this phase, we evaluate solutions according to predefined criteria,
        choose the most rational solution, and design a new organization if needed.
      </PhaseDescription>
      
      <Card 
        title="Solution Evaluation" 
        icon={<FaBalanceScale />}
      >
        <Alert type="info" title="Step 4: Evaluate Solutions">
          Define criteria and evaluate each solution variant against these criteria.
        </Alert>
        
        <CriteriaContainer>
          <h4>Evaluation Criteria</h4>
          <p className="text-gray">Define the criteria that will be used to evaluate solution variants.</p>
          
          <CriteriaList>
            {decisionPhase.evaluationCriteria.map((criteria) => (
              <CriteriaItem key={criteria.id}>
                <CriteriaHeader>
                  <CriteriaTitle>{criteria.name} (Weight: {criteria.weight})</CriteriaTitle>
                  <CriteriaActions>
                    <CriteriaButton 
                      delete 
                      onClick={() => removeCriteria(criteria.id)}
                    >
                      Remove
                    </CriteriaButton>
                  </CriteriaActions>
                </CriteriaHeader>
                <div>{criteria.description}</div>
              </CriteriaItem>
            ))}
          </CriteriaList>
          
          {showAddCriteria ? (
            <AddCriteriaForm>
              <Input
                label="Criteria Name"
                type="text"
                name="name"
                value={newCriteria.name}
                onChange={handleNewCriteriaChange}
                placeholder="Enter a name for this criteria..."
                required
              />
              
              <Textarea
                label="Criteria Description"
                name="description"
                value={newCriteria.description}
                onChange={handleNewCriteriaChange}
                placeholder="Describe what this criteria measures..."
                helpText="Explain how solutions will be evaluated against this criteria."
                rows={3}
              />
              
              <Input
                label="Weight (1-10)"
                type="number"
                name="weight"
                value={newCriteria.weight}
                onChange={handleNewCriteriaChange}
                min="1"
                max="10"
                helpText="Higher weight means this criteria is more important in the evaluation."
              />
              
              <ButtonGroup>
                <Button primary onClick={addCriteria}>Add Criteria</Button>
                <Button onClick={() => setShowAddCriteria(false)}>Cancel</Button>
              </ButtonGroup>
            </AddCriteriaForm>
          ) : (
            <AddCriteriaButton onClick={() => setShowAddCriteria(true)}>
              + Add Evaluation Criteria
            </AddCriteriaButton>
          )}
        </CriteriaContainer>
        
        {decisionPhase.evaluationCriteria.length > 0 && searchingPhase.solutionVariants.length > 0 && (
          <SolutionEvaluationContainer>
            <h4>Solution Evaluation</h4>
            <p className="text-gray">Select the most appropriate solution based on your evaluation.</p>
            
            <SolutionSelect 
              value={decisionPhase.selectedSolution || ''}
              onChange={handleSolutionSelection}
            >
              <option value="">Select the best solution</option>
              {searchingPhase.solutionVariants.map((solution) => (
                <option key={solution.id} value={solution.id}>
                  {solution.title}
                </option>
              ))}
            </SolutionSelect>
          </SolutionEvaluationContainer>
        )}
        
        {decisionPhase.selectedSolution && (
          <>
            <RadioGroup
              label="Is this a rational solution?"
              name="rationalSolution"
              options={[
                { value: 'yes', label: 'Yes, this is a rational solution' },
                { value: 'no', label: 'No, we need to reconsider our options' }
              ]}
              value={decisionPhase.isRationalSolution === null ? '' : (decisionPhase.isRationalSolution ? 'yes' : 'no')}
              onChange={(e) => handleRadioChange(e, 'isRationalSolution')}
              helpText="Consider whether this solution effectively addresses the problem and is feasible to implement."
              required
            />
          </>
        )}
      </Card>
      
      {decisionPhase.isRationalSolution === true && (
        <Card 
          title="New Organization Design" 
          icon={<FaDraftingCompass />}
        >
          <Alert type="info" title="Step 5: Design New Organization">
            If the selected solution requires organizational changes, design the new organization structure.
          </Alert>
          
          <Textarea
            label="New Organization Design"
            id="newOrganizationDesign"
            value={decisionPhase.newOrganizationDesign}
            onChange={handleInputChange}
            placeholder="Describe the new organizational structure or changes..."
            helpText="Include details about roles, responsibilities, processes, and systems."
            rows={6}
          />
          
          <Alert type="success" title="Point D: Use Design Techniques">
            Select the techniques you'll use to document and communicate the new design.
          </Alert>
          
          <FormSection
            title="Design Documentation Techniques"
            description="Select the techniques you'll use to document the new organization design."
          >
            <CheckboxGroup
              label="Graphic Techniques"
              name="graphicTechniques"
              options={graphicTechniqueOptions}
              values={decisionPhase.graphicTechniques}
              onChange={(values) => handleCheckboxChange(values, 'graphicTechniques')}
              helpText="Visual representations of the new organization."
            />
            
            <CheckboxGroup
              label="Descriptive Techniques"
              name="descriptiveTechniques"
              options={descriptiveTechniqueOptions}
              values={decisionPhase.descriptiveTechniques}
              onChange={(values) => handleCheckboxChange(values, 'descriptiveTechniques')}
              helpText="Written documentation of the new organization."
            />
            
            <CheckboxGroup
              label="Models"
              name="models"
              options={modelOptions}
              values={decisionPhase.models}
              onChange={(values) => handleCheckboxChange(values, 'models')}
              helpText="Representations that demonstrate how the new organization will function."
            />
            
            <CheckboxGroup
              label="Mockups"
              name="mockups"
              options={mockupOptions}
              values={decisionPhase.mockups}
              onChange={(values) => handleCheckboxChange(values, 'mockups')}
              helpText="Preliminary versions of systems or interfaces."
            />
          </FormSection>
          
          <RadioGroup
            label="Has the project been approved?"
            name="projectApproved"
            options={[
              { value: 'yes', label: 'Yes, the project has been approved' },
              { value: 'no', label: 'No, the project needs revision' }
            ]}
            value={decisionPhase.isProjectApproved === null ? '' : (decisionPhase.isProjectApproved ? 'yes' : 'no')}
            onChange={(e) => handleRadioChange(e, 'isProjectApproved')}
            helpText="Indicate whether the proposed solution and design have received necessary approvals."
            required
          />
        </Card>
      )}
    </div>
  );
};

export default DecisionPhase;

import React from 'react';
import styled from 'styled-components';
import { FaLightbulb, FaMagnifyingGlass, FaClipboardList } from 'react-icons/fa6';
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

const SolutionVariantContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SolutionVariantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const SolutionVariantItem = styled.div`
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  background-color: #f9f9f9;
`;

const SolutionVariantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SolutionVariantTitle = styled.div`
  font-weight: 600;
`;

const SolutionVariantActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SolutionVariantButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.delete ? 'var(--danger-color)' : 'var(--primary-color)'};
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AddSolutionForm = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: var(--border-radius);
`;

const AddSolutionButton = styled.button`
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

const SearchingPhase = () => {
  const { searchingPhase, updateSearchingPhase } = useTroubleshooting();
  const [showAddSolution, setShowAddSolution] = React.useState(false);
  const [newSolution, setNewSolution] = React.useState({ title: '', description: '' });
  
  const handleInputChange = (e) => {
    updateSearchingPhase({ [e.target.id]: e.target.value });
  };
  
  const handleRadioChange = (e, field) => {
    updateSearchingPhase({ [field]: e.target.value === 'yes' });
  };
  
  const handleCheckboxChange = (values, field) => {
    updateSearchingPhase({ [field]: values });
  };
  
  const handleNewSolutionChange = (e) => {
    setNewSolution({ ...newSolution, [e.target.name]: e.target.value });
  };
  
  const addSolutionVariant = () => {
    if (newSolution.title.trim() && newSolution.description.trim()) {
      const updatedVariants = [
        ...searchingPhase.solutionVariants,
        { ...newSolution, id: Date.now() }
      ];
      updateSearchingPhase({ solutionVariants: updatedVariants });
      setNewSolution({ title: '', description: '' });
      setShowAddSolution(false);
    }
  };
  
  const removeSolutionVariant = (id) => {
    const updatedVariants = searchingPhase.solutionVariants.filter(
      variant => variant.id !== id
    );
    updateSearchingPhase({ solutionVariants: updatedVariants });
  };
  
  const investigationTechniqueOptions = [
    { value: 'fieldResearch', label: 'Field research and observation' },
    { value: 'marketAnalysis', label: 'Market analysis' },
    { value: 'competitiveAnalysis', label: 'Competitive analysis' },
    { value: 'focusGroups', label: 'Focus groups' },
    { value: 'expertInterviews', label: 'Expert interviews' },
    { value: 'systemAudit', label: 'System audit' },
    { value: 'processAnalysis', label: 'Process analysis' },
    { value: 'financialAnalysis', label: 'Financial analysis' }
  ];
  
  const creativeThinkingTechniqueOptions = [
    { value: 'brainstorming', label: 'Brainstorming' },
    { value: 'mindMapping', label: 'Mind mapping' },
    { value: 'sixThinkingHats', label: 'Six thinking hats' },
    { value: 'scamper', label: 'SCAMPER technique' },
    { value: 'analogicalThinking', label: 'Analogical thinking' },
    { value: 'reverseThinking', label: 'Reverse thinking' },
    { value: 'morphologicalAnalysis', label: 'Morphological analysis' },
    { value: 'synectics', label: 'Synectics' }
  ];
  
  return (
    <div>
      <PhaseTitle>Phase 2: Searching</PhaseTitle>
      <PhaseDescription>
        In this phase, we assess the need for detailed studies, choose appropriate investigation
        techniques, search for solution variants, and evaluate the existing condition.
      </PhaseDescription>
      
      <Card 
        title="Detailed Studies Assessment" 
        icon={<FaMagnifyingGlass />}
      >
        <Alert type="info" title="Step 3: Assess Need for Detailed Studies">
          Determine whether more in-depth studies are necessary before proceeding to solution development.
        </Alert>
        
        <RadioGroup
          label="Are detailed studies necessary?"
          name="detailedStudies"
          options={[
            { value: 'yes', label: 'Yes, detailed studies are necessary' },
            { value: 'no', label: 'No, we can proceed to solution development' }
          ]}
          value={searchingPhase.needDetailedStudies === null ? '' : (searchingPhase.needDetailedStudies ? 'yes' : 'no')}
          onChange={(e) => handleRadioChange(e, 'needDetailedStudies')}
          helpText="Consider the complexity of the problem and the sufficiency of existing information."
          required
        />
        
        {searchingPhase.needDetailedStudies === true && (
          <>
            <Alert type="success" title="Point B: Choose Investigation Techniques">
              Select the investigation techniques you'll use for detailed studies.
            </Alert>
            
            <CheckboxGroup
              label="Select Investigation Techniques"
              name="investigationTechniques"
              options={investigationTechniqueOptions}
              values={searchingPhase.investigationTechniques}
              onChange={(values) => handleCheckboxChange(values, 'investigationTechniques')}
              helpText="Choose techniques that will provide the specific information needed."
              required
            />
            
            <Textarea
              label="Conducted Studies"
              id="conductedStudies"
              value={searchingPhase.conductedStudies}
              onChange={handleInputChange}
              placeholder="Describe the studies conducted and their methodology..."
              helpText="Include details about how the studies were performed, participants, and timeline."
              rows={4}
            />
            
            <Textarea
              label="Existing Condition Assessment"
              id="existingConditionAssessment"
              value={searchingPhase.existingConditionAssessment}
              onChange={handleInputChange}
              placeholder="Assess the current state based on your detailed studies..."
              helpText="Provide a comprehensive evaluation of the existing situation."
              rows={4}
            />
          </>
        )}
        
        {searchingPhase.needDetailedStudies === false && (
          <>
            <Alert type="success" title="Point C: Use Creative Thinking Techniques">
              Select creative thinking techniques to generate solution variants.
            </Alert>
            
            <CheckboxGroup
              label="Select Creative Thinking Techniques"
              name="creativeThinkingTechniques"
              options={creativeThinkingTechniqueOptions}
              values={searchingPhase.creativeThinkingTechniques}
              onChange={(values) => handleCheckboxChange(values, 'creativeThinkingTechniques')}
              helpText="Choose techniques that will help generate innovative solutions."
              required
            />
          </>
        )}
      </Card>
      
      <Card 
        title="Solution Variants" 
        icon={<FaLightbulb />}
      >
        <Alert type="info" title="Step 3: Search for Solution Variants">
          Generate and document potential solutions to the identified problem.
        </Alert>
        
        <SolutionVariantContainer>
          <SolutionVariantList>
            {searchingPhase.solutionVariants.map((variant) => (
              <SolutionVariantItem key={variant.id}>
                <SolutionVariantHeader>
                  <SolutionVariantTitle>{variant.title}</SolutionVariantTitle>
                  <SolutionVariantActions>
                    <SolutionVariantButton 
                      delete 
                      onClick={() => removeSolutionVariant(variant.id)}
                    >
                      Remove
                    </SolutionVariantButton>
                  </SolutionVariantActions>
                </SolutionVariantHeader>
                <div>{variant.description}</div>
              </SolutionVariantItem>
            ))}
          </SolutionVariantList>
          
          {showAddSolution ? (
            <AddSolutionForm>
              <Input
                label="Solution Title"
                type="text"
                name="title"
                value={newSolution.title}
                onChange={handleNewSolutionChange}
                placeholder="Enter a concise title for this solution..."
                required
              />
              
              <Textarea
                label="Solution Description"
                name="description"
                value={newSolution.description}
                onChange={handleNewSolutionChange}
                placeholder="Describe this solution in detail..."
                helpText="Include how it addresses the problem, implementation considerations, and potential benefits."
                required
                rows={4}
              />
              
              <ButtonGroup>
                <Button primary onClick={addSolutionVariant}>Add Solution</Button>
                <Button onClick={() => setShowAddSolution(false)}>Cancel</Button>
              </ButtonGroup>
            </AddSolutionForm>
          ) : (
            <AddSolutionButton onClick={() => setShowAddSolution(true)}>
              + Add Solution Variant
            </AddSolutionButton>
          )}
        </SolutionVariantContainer>
        
        <RadioGroup
          label="Do you have sufficient information to evaluate solutions?"
          name="sufficientInformation"
          options={[
            { value: 'yes', label: 'Yes, we have sufficient information' },
            { value: 'no', label: 'No, we need additional information' }
          ]}
          value={searchingPhase.sufficientInformation === null ? '' : (searchingPhase.sufficientInformation ? 'yes' : 'no')}
          onChange={(e) => handleRadioChange(e, 'sufficientInformation')}
          helpText="Consider whether you have enough data to make an informed decision."
          required
        />
        
        {searchingPhase.sufficientInformation === false && (
          <>
            <Textarea
              label="Specialist Consultations"
              id="specialistConsultations"
              value={searchingPhase.specialistConsultations}
              onChange={handleInputChange}
              placeholder="Describe consultations with specialists..."
              helpText="Include who was consulted, their expertise, and key insights provided."
              rows={4}
            />
            
            <Textarea
              label="Additional Data Collected"
              id="additionalData"
              value={searchingPhase.additionalData}
              onChange={handleInputChange}
              placeholder="Describe additional data collected..."
              helpText="Include what data was collected, how it was collected, and key findings."
              rows={4}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default SearchingPhase;

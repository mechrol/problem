import React, { createContext, useContext, useState } from 'react';

const TroubleshootingContext = createContext();

export const useTroubleshooting = () => useContext(TroubleshootingContext);

export const TroubleshootingProvider = ({ children }) => {
  // Diagnostic Phase State
  const [diagnosticPhase, setDiagnosticPhase] = useState({
    problemDefinition: '',
    environmentChanges: '',
    economicSituation: '',
    managementRecommendations: '',
    analysisResults: '',
    deviationSymptoms: '',
    isWorthInvestigating: null,
    diagnosticTechniques: [],
    studyResults: '',
    problemSolutionCard: ''
  });
  
  // Searching Phase State
  const [searchingPhase, setSearchingPhase] = useState({
    needDetailedStudies: null,
    investigationTechniques: [],
    creativeThinkingTechniques: [],
    solutionVariants: [],
    conductedStudies: '',
    existingConditionAssessment: '',
    sufficientInformation: null,
    specialistConsultations: '',
    additionalData: ''
  });
  
  // Decision Phase State
  const [decisionPhase, setDecisionPhase] = useState({
    evaluationCriteria: [],
    solutionEvaluations: [],
    selectedSolution: null,
    isRationalSolution: null,
    newOrganizationDesign: '',
    graphicTechniques: [],
    descriptiveTechniques: [],
    models: [],
    mockups: [],
    isProjectApproved: null
  });
  
  // Evaluation Phase State
  const [evaluationPhase, setEvaluationPhase] = useState({
    authorSupervision: '',
    trainingTechniques: [],
    engineeringTechniques: [],
    isFunctioningAsDesigned: null,
    economicEffects: '',
    socialEffects: '',
    evaluationTechniques: {
      quantitative: [],
      valueBasedTechniques: [],
      socialTechniques: []
    },
    positiveEffectsAchieved: null
  });
  
  // Update functions for each phase
  const updateDiagnosticPhase = (updates) => {
    setDiagnosticPhase(prev => ({ ...prev, ...updates }));
  };
  
  const updateSearchingPhase = (updates) => {
    setSearchingPhase(prev => ({ ...prev, ...updates }));
  };
  
  const updateDecisionPhase = (updates) => {
    setDecisionPhase(prev => ({ ...prev, ...updates }));
  };
  
  const updateEvaluationPhase = (updates) => {
    setEvaluationPhase(prev => ({ ...prev, ...updates }));
  };
  
  // Get all data for reporting
  const getAllData = () => {
    return {
      diagnosticPhase,
      searchingPhase,
      decisionPhase,
      evaluationPhase
    };
  };
  
  // Reset all data
  const resetAllData = () => {
    setDiagnosticPhase({
      problemDefinition: '',
      environmentChanges: '',
      economicSituation: '',
      managementRecommendations: '',
      analysisResults: '',
      deviationSymptoms: '',
      isWorthInvestigating: null,
      diagnosticTechniques: [],
      studyResults: '',
      problemSolutionCard: ''
    });
    
    setSearchingPhase({
      needDetailedStudies: null,
      investigationTechniques: [],
      creativeThinkingTechniques: [],
      solutionVariants: [],
      conductedStudies: '',
      existingConditionAssessment: '',
      sufficientInformation: null,
      specialistConsultations: '',
      additionalData: ''
    });
    
    setDecisionPhase({
      evaluationCriteria: [],
      solutionEvaluations: [],
      selectedSolution: null,
      isRationalSolution: null,
      newOrganizationDesign: '',
      graphicTechniques: [],
      descriptiveTechniques: [],
      models: [],
      mockups: [],
      isProjectApproved: null
    });
    
    setEvaluationPhase({
      authorSupervision: '',
      trainingTechniques: [],
      engineeringTechniques: [],
      isFunctioningAsDesigned: null,
      economicEffects: '',
      socialEffects: '',
      evaluationTechniques: {
        quantitative: [],
        valueBasedTechniques: [],
        socialTechniques: []
      },
      positiveEffectsAchieved: null
    });
  };
  
  return (
    <TroubleshootingContext.Provider
      value={{
        diagnosticPhase,
        searchingPhase,
        decisionPhase,
        evaluationPhase,
        updateDiagnosticPhase,
        updateSearchingPhase,
        updateDecisionPhase,
        updateEvaluationPhase,
        getAllData,
        resetAllData
      }}
    >
      {children}
    </TroubleshootingContext.Provider>
  );
};

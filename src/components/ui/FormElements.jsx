import React from 'react';
import styled from 'styled-components';

// Input
const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const InputHelp = styled.div`
  font-size: 0.875rem;
  color: var(--gray-color);
  margin-top: 0.5rem;
`;

export const Input = ({ 
  label, 
  type = 'text', 
  id, 
  value, 
  onChange, 
  placeholder, 
  helpText,
  required = false
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label} {required && <span style={{ color: 'red' }}>*</span>}</InputLabel>
      <InputField 
        type={type} 
        id={id} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        required={required}
      />
      {helpText && <InputHelp>{helpText}</InputHelp>}
    </InputContainer>
  );
};

// Textarea
const TextareaField = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  transition: var(--transition);
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const Textarea = ({ 
  label, 
  id, 
  value, 
  onChange, 
  placeholder, 
  helpText,
  rows = 4,
  required = false
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label} {required && <span style={{ color: 'red' }}>*</span>}</InputLabel>
      <TextareaField 
        id={id} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
      {helpText && <InputHelp>{helpText}</InputHelp>}
    </InputContainer>
  );
};

// Select
const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  transition: var(--transition);
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const Select = ({ 
  label, 
  id, 
  value, 
  onChange, 
  options = [], 
  helpText,
  required = false
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label} {required && <span style={{ color: 'red' }}>*</span>}</InputLabel>
      <SelectField 
        id={id} 
        value={value} 
        onChange={onChange}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
      {helpText && <InputHelp>{helpText}</InputHelp>}
    </InputContainer>
  );
};

// Radio Group
const RadioGroupContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const RadioGroupLabel = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const RadioOptions = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

const RadioLabel = styled.label`
  cursor: pointer;
`;

export const RadioGroup = ({ 
  label, 
  name, 
  options = [], 
  value, 
  onChange, 
  helpText,
  required = false
}) => {
  return (
    <RadioGroupContainer>
      <RadioGroupLabel>{label} {required && <span style={{ color: 'red' }}>*</span>}</RadioGroupLabel>
      <RadioOptions>
        {options.map((option, index) => (
          <RadioOption key={index}>
            <RadioInput 
              type="radio" 
              id={`${name}-${index}`} 
              name={name} 
              value={option.value} 
              checked={value === option.value}
              onChange={onChange}
              required={required && index === 0}
            />
            <RadioLabel htmlFor={`${name}-${index}`}>{option.label}</RadioLabel>
          </RadioOption>
        ))}
      </RadioOptions>
      {helpText && <InputHelp>{helpText}</InputHelp>}
    </RadioGroupContainer>
  );
};

// Checkbox Group
const CheckboxGroupContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const CheckboxGroupLabel = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const CheckboxOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckboxOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

export const CheckboxGroup = ({ 
  label, 
  name, 
  options = [], 
  values = [], 
  onChange, 
  helpText,
  required = false
}) => {
  const handleChange = (value) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    
    onChange(newValues);
  };
  
  return (
    <CheckboxGroupContainer>
      <CheckboxGroupLabel>{label} {required && <span style={{ color: 'red' }}>*</span>}</CheckboxGroupLabel>
      <CheckboxOptions>
        {options.map((option, index) => (
          <CheckboxOption key={index}>
            <CheckboxInput 
              type="checkbox" 
              id={`${name}-${index}`} 
              name={name} 
              value={option.value} 
              checked={values.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <CheckboxLabel htmlFor={`${name}-${index}`}>{option.label}</CheckboxLabel>
          </CheckboxOption>
        ))}
      </CheckboxOptions>
      {helpText && <InputHelp>{helpText}</InputHelp>}
    </CheckboxGroupContainer>
  );
};

// Form Section
const SectionContainer = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: ${props => props.noBorder ? 'none' : '1px solid #eaeaea'};
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const SectionDescription = styled.p`
  color: var(--gray-color);
  margin-bottom: 1.5rem;
`;

export const FormSection = ({ 
  title, 
  description, 
  children,
  noBorder = false
}) => {
  return (
    <SectionContainer noBorder={noBorder}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {description && <SectionDescription>{description}</SectionDescription>}
      {children}
    </SectionContainer>
  );
};

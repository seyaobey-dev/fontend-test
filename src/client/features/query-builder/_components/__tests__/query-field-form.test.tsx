import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryFieldForm } from '../query-field-form';
import { useQueryBuilderData } from '../../_providers/use-query-builder-data';
import { FieldCondition, FieldName } from '../../../../../types';

// Mock the useQueryBuilderData hook
vi.mock('../../_providers/use-query-builder-data', () => ({
  useQueryBuilderData: vi.fn(),
}));

describe('QueryFieldForm', () => {
  const mockHandleFieldValueChange = vi.fn();
  const mockHandleDeleteField = vi.fn();

  const mockFieldsMapping = {
    amount: { type: 'currency', label: 'Amount' },
    name: { type: 'string', label: 'Name' },
    transaction_state: { type: 'enum', label: 'Transaction State', options: ['APPROVED', 'DECLINED'] },
  };

  const mockField: FieldCondition = {
    id: 'test-field-id',
    fieldName: 'amount' as FieldName,
    operator: 'EQUAL',
    value: { amount: 100, currency: 'USD' },
  };

  beforeEach(() => {
    vi.mocked(useQueryBuilderData).mockReturnValue({
      fieldsMapping: mockFieldsMapping,
      handleFieldValueChange: mockHandleFieldValueChange,
      handleDeleteField: mockHandleDeleteField,
    } as never);
  });

  it('renders all form controls', () => {
    render(<QueryFieldForm groupId="test-group" field={mockField} />);
    
    expect(screen.getByLabelText('Field name')).toBeDefined();
    expect(screen.getByLabelText('Operator')).toBeDefined();
    expect(screen.getByRole('delete-button')).toBeDefined();
  });

  it('calls handleFieldValueChange when field name changes', () => {
    render(<QueryFieldForm groupId="test-group" field={mockField} />);
    
    fireEvent.click(screen.getByLabelText('Field name'));
    fireEvent.click(screen.getByText('Name'));
    
    expect(mockHandleFieldValueChange).toHaveBeenCalledWith({
      groupId: 'test-group',
      fieldId: 'test-field-id',
      key: 'fieldName',
      value: 'name',
    });
  });

  it('calls handleFieldValueChange when operator changes', () => {
    render(<QueryFieldForm groupId="test-group" field={mockField} />);
    
    fireEvent.click(screen.getByLabelText('Operator'));
    fireEvent.click(screen.getByText('NOT_EQUAL'));
    
    expect(mockHandleFieldValueChange).toHaveBeenCalledWith({
      groupId: 'test-group',
      fieldId: 'test-field-id',
      key: 'operator',
      value: 'NOT_EQUAL',
    });
  });

  it('renders CurrencyInput for currency type fields', () => {
    render(<QueryFieldForm groupId="test-group" field={mockField} />);
    expect(screen.getByLabelText('Currency')).toBeDefined();
  });

  it('renders CustomInput for string type fields', () => {
    const stringField = { ...mockField, fieldName: 'name' as FieldName, value: 'John' };
    render(<QueryFieldForm groupId="test-group" field={stringField} />);

    expect(screen.getByLabelText('Value')).toBeDefined();
  });

  it('renders CustomSelect for enum type fields', () => {
    const enumField = { ...mockField, fieldName: 'transaction_state' as FieldName, value: 'APPROVED' };
    render(<QueryFieldForm groupId="test-group" field={enumField} />);
    
    expect(screen.getByLabelText('Transaction State')).toBeDefined();
  });

  it('calls handleDeleteField when delete button is clicked', () => {
    render(<QueryFieldForm groupId="test-group" field={mockField} />);
    
    fireEvent.click(screen.getByRole('delete-button'));
    
    expect(mockHandleDeleteField).toHaveBeenCalledWith({
      groupId: 'test-group',
      fieldId: 'test-field-id',
    });
  });
});


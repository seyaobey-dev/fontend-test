import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CombinatorDropDown } from '../combinator-dropdown';
import { useQueryBuilderData } from '../../_providers/use-query-builder-data';

// Mock the useQueryBuilderData hook
vi.mock('../../_providers/use-query-builder-data', () => ({
  useQueryBuilderData: vi.fn(),
}));

describe('CombinatorDropDown', () => {
  const mockHandleChangeCombinator = vi.fn();

  beforeEach(() => {
    vi.mocked(useQueryBuilderData).mockReturnValue({
      handleChangeCombinator: mockHandleChangeCombinator,
    } as never);
  });

  it('renders with initial value', () => {
    render(<CombinatorDropDown id="test-id" value="AND" />);
    expect(screen.getByText('AND')).toBeDefined();
  });

  it('opens dropdown when clicked', () => {
    render(<CombinatorDropDown id="test-id" value="AND" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('OR')).toBeDefined();
  });

  it('calls handleChangeCombinator when an option is selected', () => {
    render(<CombinatorDropDown id="test-id" value="AND" />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('OR'));
    expect(mockHandleChangeCombinator).toHaveBeenCalledWith({ groupId: 'test-id', value: 'OR' });
  });

  it('closes dropdown after selecting an option', () => {
    render(<CombinatorDropDown id="test-id" value="AND" />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('OR'));
    expect(screen.queryByText('OR')).toBeNull();
  });
});

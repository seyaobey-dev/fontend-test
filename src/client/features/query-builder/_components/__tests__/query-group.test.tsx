
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryGroup } from '../query-group';
import { GroupQuery } from '../../../../../types';
import { fieldsMapping } from '../../../../constants';
import { useQueryBuilderData } from '../../_providers/use-query-builder-data';

// Mock the useQueryBuilderData hook
vi.mock('../../_providers/use-query-builder-data', () => ({
    useQueryBuilderData: vi.fn(),
}));

describe('QueryGroup Component', () => {
    const mockHandleAppendField = vi.fn();
    const mockHandleAppendGroup = vi.fn();
    const mockHandleDeleteGroup = vi.fn();

    const mockGroup: GroupQuery = {
        id: '1',
        parentId: null,
        combinator: 'AND',
        fields: [{ id: 'field1', fieldName: 'name', operator: "EQUAL", value: "test" }],
    };

    const mockData: GroupQuery[] = [
        mockGroup,
        {
            parentId: "1",
            id: "2",
            combinator: "OR",
            fields: [
                { id: 'field2', fieldName: 'id', operator: "EQUAL", value: "123" }
            ]
        }
    ];

    beforeEach(() => {
        vi.mocked(useQueryBuilderData).mockReturnValue({
            fieldsMapping,
            handleAppendField: mockHandleAppendField,
            handleAppendGroup: mockHandleAppendGroup,
            handleDeleteGroup: mockHandleDeleteGroup,
        } as never)
    });

    it('renders without crashing', () => {
        render(<QueryGroup group={mockGroup} data={[]} deletable />);
        expect(screen.getByText('+ Rule')).toBeInTheDocument();
        expect(screen.getByRole('add-group')).toBeInTheDocument();
        expect(screen.getByRole('delete-group')).toBeInTheDocument();
    });

    it('renders fields of the current group', () => {
        render(<QueryGroup group={mockGroup} data={mockData} deletable={true} />);
        expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('renders sub-groups recursively', () => {
        render(<QueryGroup group={mockGroup} data={mockData} deletable={true} />);
        expect(screen.getAllByText('+ Rule')).toHaveLength(2);
        expect(screen.getAllByRole('add-group')).toHaveLength(2);
    });

    it('calls handleAppendField when + Rule button is clicked', () => {
        render(<QueryGroup group={mockGroup} data={[]} deletable={true} />);
        expect(screen.getAllByText('+ Rule')).toHaveLength(1);

        fireEvent.click(screen.getByText('+ Rule'));
        expect(mockHandleAppendField).toHaveBeenCalledWith({ groupId: '1' });
    });


    it('calls handleAppendGroup when + Group button is clicked', () => {
        render(<QueryGroup group={mockGroup} data={[]} deletable={true} />);
        expect(screen.getAllByRole('add-group')).toHaveLength(1);

        fireEvent.click(screen.getByRole('add-group'));
        expect(mockHandleAppendGroup).toHaveBeenCalledWith({ groupId: '1' });
        
    });

    it('calls handleDeleteGroup when Delete button is clicked', () => {
        render(<QueryGroup group={mockGroup} data={[]} deletable={true} />);
        fireEvent.click(screen.getByRole('delete-group'));
        expect(mockHandleDeleteGroup).toHaveBeenCalledWith({ groupId: '1' });
    });
});

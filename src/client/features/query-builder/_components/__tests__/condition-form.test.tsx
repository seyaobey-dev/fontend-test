import { describe, it } from "node:test";
import { render } from "@testing-library/react";
import { ConditionForm } from "../condition-form";

describe("ConditionForm", () => {
    it("renders", () => {
        render(<ConditionForm />);
    });

    /**
     * it('renders all form elements', () => {
    render(<ConditionForm />);

    expect(screen.getByLabelText('Field name')).toBeInTheDocument();
    expect(screen.getByLabelText('Operator')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('has correct initial values', () => {
    render(<ConditionForm />);

    expect(screen.getByLabelText('Field name')).toHaveValue('Field 1');
    expect(screen.getByLabelText('Operator')).toHaveValue('Operator 1');
  });

  it('updates field value when changed', () => {
    render(<ConditionForm />);

    const fieldSelect = screen.getByLabelText('Field name');
    fireEvent.change(fieldSelect, { target: { value: 'Field 2' } });

    expect(fieldSelect).toHaveValue('Field 2');
  });

  it('updates operator value when changed', () => {
    render(<ConditionForm />);

    const operatorSelect = screen.getByLabelText('Operator');
    fireEvent.change(operatorSelect, { target: { value: 'Operator 3' } });

    expect(operatorSelect).toHaveValue('Operator 3');
  });

  it('renders all field options', () => {
    render(<ConditionForm />);

    const fieldSelect = screen.getByLabelText('Field name');
    expect(fieldSelect).toContainElement(screen.getByText('Field 1'));
    expect(fieldSelect).toContainElement(screen.getByText('Field 2'));
    expect(fieldSelect).toContainElement(screen.getByText('Field 3'));
  });

  it('renders all operator options', () => {
    render(<ConditionForm />);

    const operatorSelect = screen.getByLabelText('Operator');
    expect(operatorSelect).toContainElement(screen.getByText('Operator 1'));
    expect(operatorSelect).toContainElement(screen.getByText('Operator 2'));
    expect(operatorSelect).toContainElement(screen.getByText('Operator 3'));
  });
     */
});
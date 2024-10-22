import { SelectCombinator } from "./select-combinator";
import { ConditionForm } from "./condition-form";
import { SelectOperatorButton } from "./form-controls";

/**
 * This component represents a single query rule.
 * It allows the user to add a new rule or group to the query.
 */

export const QueryRule = () => (
    <div>
        <div className="flex flex-row items-center gap-2 z-20">
            <SelectCombinator />
            <SelectOperatorButton>+ Rule</SelectOperatorButton>
            <SelectOperatorButton>+ Group</SelectOperatorButton>
        </div>
        <div className="mt-3">
            <ConditionForm />
        </div>
    </div>
)
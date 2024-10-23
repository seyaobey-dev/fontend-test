import { SelectCombinator } from "./select-combinator";
import { ConditionForm } from "./condition-form";
import { SelectOperatorButton } from "./form-controls";
import { CombinatorOperation, FieldCondition } from "../../../../types";

/**
 * This component represents a single query rule.
 * It allows the user to add a new rule or group to the query.
 */

export const QueryRule: React.FC<{
    combinator: CombinatorOperation;
    fields: FieldCondition[];
}> = ({ combinator, fields }) => (
    <div>
        <div className="flex flex-row items-center gap-2 z-20">
            <SelectCombinator combinator={combinator} />
            <SelectOperatorButton>+ Rule</SelectOperatorButton>
            <SelectOperatorButton>+ Group</SelectOperatorButton>
        </div>
        <div className="mt-3">
            {fields.map((field) => (    
                <ConditionForm key={field.fieldName} field={field} />
            ))}
        </div>
    </div>
)
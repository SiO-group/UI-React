import {useState} from "react";
import {DataTableControlsProps} from "../types/data-table-props";

export const DataTableControls = ({
    currentSearch,
    handleSearch,
    entity,
}: DataTableControlsProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="datatable__controls">
            <div className={`form-field${currentSearch ? ' form-field--has-value' : ''}${focused ? ' form-field--focused' : ''}`}>
                <div className="form-field__control">
                    <input
                        className="search"
                        type="search"
                        value={currentSearch ?? ''}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={`Zoeken in ${entity?.label.toLowerCase() ?? 'tabel'}`}
                        aria-label={`Zoeken in ${entity?.label.toLowerCase() ?? 'tabel'}`}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                </div>
            </div>
        </div>
    )
}
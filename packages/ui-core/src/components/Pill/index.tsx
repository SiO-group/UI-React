import {PillProps} from "../../types";

export const Pill = ({status, label}: PillProps) => (
    <div className={`pill pill--${status}`}>{label}</div>
);
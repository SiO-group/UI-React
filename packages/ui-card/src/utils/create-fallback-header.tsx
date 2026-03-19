import {CardHeader} from "../components/CardHeader";
import {FallbackHeaderProps} from "../types";

export const createFallbackHeader = ({ title, subtitle }: FallbackHeaderProps) => {
    return (
        <CardHeader>
            {title && <h2>{title}</h2>}
            {subtitle && <h3>{subtitle}</h3>}
        </CardHeader>
    )
}
import React from "react";
import {CARD_HEADER, HeaderProps} from "../types";

export const CardHeader = ({children}: HeaderProps) => (
    <div className="card__header">
        {children}
    </div>
);

(CardHeader as any).$$type = CARD_HEADER;
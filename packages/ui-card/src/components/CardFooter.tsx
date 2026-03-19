import React from "react";
import {CARD_FOOTER, FooterProps} from "../types";

export const CardFooter = ({children}: FooterProps) => (
    <div className="card__footer">
        {children}
    </div>
);

(CardFooter as any).$$type = CARD_FOOTER;
import {FC, ReactNode} from "react";
import {BodyProps, CARD_BODY} from "../types";

export const CardBody: FC<{children: ReactNode}> = ({children}: BodyProps) => (
    <div className="card__body">{children}</div>
);

(CardBody as any).$$type = CARD_BODY;
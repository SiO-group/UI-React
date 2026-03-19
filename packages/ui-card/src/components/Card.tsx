import {CardProps} from "../types";
import {CardHeader} from "./CardHeader";
import {CardBody} from "./CardBody";
import {CardFooter} from "./CardFooter";
import {CardComponent} from "../types";
import {findChildren} from "../utils/find-children";
import {createFallbackHeader} from "../utils/create-fallback-header";
import {createFallbackBody} from "../utils/create-fallback-body";
import {Children, isValidElement, ReactElement} from "react";
import {createFallbackFooter} from "../utils/create-fallback-footer";
import {isCardForm} from "../utils/is-card-form";

export const Card: CardComponent = ({
    title,
    subtitle,
    addShadow = false,
    className,
    style,
    children,
    actions,
}: CardProps) => {
    const classes: string = ["card", addShadow && "card--shadow", className]
        .filter(Boolean)
        .join(" ");

    let { header, body, footer } = findChildren(children);
    const modalForm = Children.toArray(children).find(
        child => isValidElement(child) && isCardForm(child)
    ) as ReactElement | undefined;

    if (!header && (title || subtitle)) header = createFallbackHeader({ title, subtitle });
    if (!body && !modalForm) body = createFallbackBody({children});
    if (!footer && (actions?.length)) footer = createFallbackFooter({actions});

    return (
        <div className={classes} style={style}>
            {header}
            {modalForm
                ? children
                : (
                    <>
                        {body}
                        {footer}
                    </>
                )}
        </div>
    );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
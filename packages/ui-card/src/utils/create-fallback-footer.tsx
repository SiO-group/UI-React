import {Button, Link} from "@sio-group/ui-core";
import type {ButtonProps, LinkProps} from "@sio-group/ui-core";
import {FallbackFooterProps} from "../types";
import {CardFooter} from "../components/CardFooter";



export const createFallbackFooter = ({actions}: FallbackFooterProps) => {
    const renderButton = (props: ButtonProps | LinkProps, i: number) => {
        return props.type === 'link' ? (
            <Link {...(props as LinkProps)} key={i} />
        ) : (
            <Button {...(props as ButtonProps)} key={i} />
        );
    }

    return (
        <CardFooter>
            {(actions?.length) && (
                <div className="btn-group">
                    {actions?.map((action: ButtonProps | LinkProps, i: number) => renderButton(action, i))}
                </div>
            )}
        </CardFooter>
    )
}
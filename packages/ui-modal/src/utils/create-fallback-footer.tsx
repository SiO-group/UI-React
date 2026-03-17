import {ModalFooter} from "../components/ModalFooter";
import {Button, Link} from "@sio-group/ui-core";
import type {ButtonProps, LinkProps} from "@sio-group/ui-core";
import {FallbackFooterProps} from "../types";



export const createFallbackFooter = ({actions, showClose = true, close}: FallbackFooterProps) => {
    const renderButton = (props: ButtonProps | LinkProps, i: number) => {
        return props.type === 'link' ? (
            <Link {...(props as LinkProps)} key={i} />
        ) : (
            <Button {...(props as ButtonProps)} key={i} />
        );
    }

    return (
        <ModalFooter>
            {(showClose || actions?.length) && (
                <div className="btn-group">
                    <Button
                        variant="secondary"
                        color="default"
                        onClick={() => close?.()}
                    >Annuleren</Button>

                    {actions?.map((action: ButtonProps | LinkProps, i: number) => renderButton(action, i))}
                </div>
            )}
        </ModalFooter>
    )
}
import {ActionMenu} from "./action-menu";
import {Entity} from "./entity";
import {ReactNode} from "react";

export interface ActionCellProps <T extends { id: string | number }> {
    actionMenu?: ActionMenu<T>;
    item: T;
    renderMenuIcon?: () => ReactNode;
}
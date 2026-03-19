import {FC} from "react";
import {CardHeader} from "../components/CardHeader";
import {CardBody} from "../components/CardBody";
import {CardFooter} from "../components/CardFooter";
import {CardProps} from "./card-props";

export type CardComponent = FC<CardProps> & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
};
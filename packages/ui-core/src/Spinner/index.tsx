import React from "react";

export const Spinner = () => {
    return (
        <span className='spinner' aria-hidden='true'>
            <svg viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='8' />
            </svg>
        </span>
    );
};
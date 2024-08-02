import React, { SVGProps } from "react";

const MenuIcon = (width: string, height: string, fill: string, props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 48 48"
        width={width}
        height={height} 
        {...props}>
        <path fill={fill}
            d="M6 22H42V26H6zM6 10H42V14H6zM6 34H42V38H6z"
        />
    </svg>
);
export default MenuIcon;

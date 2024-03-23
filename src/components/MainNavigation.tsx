import classes from './MainNavigation.module.css'
import HamburgerMenu from "./HamburgerMenu";
import React, { useState } from "react";
import { MenuList } from "./MenuList/MenuList";

interface MenuNavigator {
    isMobile: boolean
}

interface BurgerMenuProps {
    isOpen: boolean
}
const MenuNavigator: React.FC<MenuNavigator> = ({ isMobile }) => (
    <header className={isMobile ? classes.mobile : classes.header}>
        <nav>
          <MenuList />
        </nav>
    </header>
)

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen }) => {
    return (
        <nav
            className={
                `${classes.mobileNav}
                    ${isOpen ?
                    classes.mobilenavopen :
                    classes.mobilenavclose}
                `}>
            <MenuList />
        </nav>
    )
}


export default function MainNavigation() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <MenuNavigator isMobile={false} />
            <HamburgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(prevProp => !prevProp)} />
            <BurgerMenu isOpen={isOpen} />
        </>
    )
}
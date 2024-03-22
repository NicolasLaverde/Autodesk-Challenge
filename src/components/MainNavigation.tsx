import { NavLink } from "react-router-dom";

import classes from './MainNavigation.module.css'
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

interface MenuNavigator {
    isMobile: boolean
}
const MenuNavigator: React.FC<MenuNavigator> = ({ isMobile }) => (
    <header className={isMobile ? classes.mobile : classes.header}>
        <nav>
            <ul className={classes.list}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                        isActive ? classes.active : undefined
                    }
                    end
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/lovePlaces"
                        className={({ isActive }) => 
                        isActive ? classes.active : undefined
                    }
                    end
                    >
                        Places I Liked
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
)


export default function MainNavigation() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <MenuNavigator isMobile={false} />
            <HamburgerMenu isOpen={isOpen} toggleMenu={() => setIsOpen(prevProp => !prevProp)} />
            {isOpen && (
                <MenuNavigator isMobile/>
            )}
        </>
    )
}
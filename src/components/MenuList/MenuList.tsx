import { NavLink } from "react-router-dom";
import './MenuList.css'
import { navLinks } from "../../types/hamburgerMenu";
import { useTranslation } from "react-i18next";


export const MenuList = () => {
    const { t } = useTranslation();

    return(
    <ul className="list">
        {navLinks.map(({ title, to, isEnd }) => (
            <li>
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                    end={isEnd}
                >
                    {t(title)}
                </NavLink>
            </li>
        ))}
    </ul>
    )    
}
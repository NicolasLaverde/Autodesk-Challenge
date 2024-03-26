import { NavLink } from "react-router-dom";
import './MenuList.css'
import { navLinks } from "../../types/hamburgerMeny";


export const MenuList = () =>
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
                    {title}
                </NavLink>
            </li>
        ))}
    </ul>
import { NavLink } from "react-router-dom";
import './MenuList.css'

interface NavLinkInterface {
    to: string
    isEnd: boolean
    title: string
}

const navLinks: NavLinkInterface[] = [{
    to: "/autodesk-challenge",
    isEnd: true,
    title: 'Home'
}, {
    to: 'lovePlaces',
    isEnd: true,
    title: 'Places You Liked'
}]


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
export interface HamburgerMenuProps {
    isOpen: boolean
    toggleMenu: () => void
  }

export interface NavLinkInterface {
    to: string
    isEnd: boolean
    title: string
}

export const navLinks: NavLinkInterface[] = [{
    to: "/autodesk-challenge",
    isEnd: true,
    title: 'Home'
}, {
    to: 'lovePlaces',
    isEnd: true,
    title: 'Places You Liked'
}]
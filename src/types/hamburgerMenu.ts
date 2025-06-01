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
    title: 'header.home'
}, {
    to: 'lovePlaces',
    isEnd: true,
    title: 'header.placesLiked'
}]
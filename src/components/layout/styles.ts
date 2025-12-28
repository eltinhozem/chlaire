import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
`

export const Navbar = styled.header`
  background-color: #c5ab87;
  color: #f6ede1;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
`

export const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  text-align: center;

  @media (max-width: 640px) {
    padding: 1.25rem 1.25rem 1rem;
    gap: 0.75rem;
  }
`

export const BrandLink = styled(Link)`
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  letter-spacing: 0.2em;
  color: #f6ede1;
  text-decoration: none;
  font-weight: 600;
  line-height: 1;

  &:hover {
    color: #ffffff;
  }
`

export const DesktopBrand = styled(BrandLink)`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

export const MobileBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.85rem;

  @media (min-width: 768px) {
    display: none;
  }
`

export const MenuToggleButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: background 0.2s ease, transform 0.2s ease;

  span {
    display: block;
    width: 1.6rem;
    height: 2px;
    background: #f6ede1;
    border-radius: 999px;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(246, 237, 225, 0.35);
  }

  @media (min-width: 768px) {
    display: none;
  }
`

export const NavMenu = styled.nav<{ $open?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    padding-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    gap: 1rem;
  }
`

export const NavMenuLink = styled(NavLink)`
  font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #fafafaff;
  font-weight: 100;
  position: relative;
  padding: 0.35rem 0.1rem;
  transition: color 0.2s ease, transform 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.4rem;
    width: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.85);
    transition: width 0.2s ease;
  }

  &:hover {
    color: #ffffff;
    transform: translateY(-1px);
  }

  &:hover::after,
  &[aria-current='page']::after {
    width: 100%;
  }

  &[aria-current='page'] {
    color: #ffffff;
  }

  @media (max-width: 640px) {
    font-size: 0.85rem;
    letter-spacing: 0.06em;
  }
`

export const ThemeToggleButton = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #f6ede1;
  border-radius: 999px;
  padding: 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(246, 237, 225, 0.35);
  }

  @media (max-width: 640px) {
    right: 1rem;
    top: 1rem;
    padding: 0.35rem;
  }
`

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 0 1.5rem;

  @media (max-width: 640px) {
    padding: 0 1rem;
  }
`

export const Main = styled.main`
  flex-grow: 1;
  padding: 1.5rem 0;
`

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground || '#ffffff'};
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
`

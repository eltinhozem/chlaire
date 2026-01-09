import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LayoutContainer = styled.div`
  --deep-charcoal: #12131aff;
  --hover-dark: #1d222b;
  --muted-gold: #c29b62;
  --light-gold: #d8b47a;
  --cream-bg: #f8f5f0;
  --white-card: #ffffff;
  --primary-text: #2d2d2d;
  --secondary-text: #8a9099;
  --card-shadow: rgba(0, 0, 0, 0.05);
  --card-border: #e0e0e0;
  --detail-border: #f0f0f0;
  --gold-gradient: linear-gradient(
    to bottom,
    #eadbb4 8%,
    #c7a068 50%,
    #8f6a37 92%
  );

  min-height: 100vh;
  display: flex;
  background-color: var(--cream-bg);
  color: var(--primary-text);
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Sidebar = styled.aside<{ $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '90px' : '280px')};
  background-color: var(--deep-charcoal);
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.15;
    pointer-events: none;
    background-image: repeating-radial-gradient(
        #ffffff 0.0001%,
        transparent 0.0005%,
        transparent 0.005%
      ),
      repeating-radial-gradient(
        #000000 0.0001%,
        transparent 0.0005%,
        transparent 0.005%
      );
    background-size: 77px 77px;
    background-blend-mode: overlay;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    width: ${({ $collapsed }) => ($collapsed ? '84px' : '240px')};
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    padding: 16px 0 12px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'logo actions'
      'nav nav';
    row-gap: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`

export const SidebarLogo = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: ${({ $collapsed }) => ($collapsed ? '20px' : '40px')};
  padding: ${({ $collapsed }) => ($collapsed ? '0' : '0 20px')};
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;

  @media (max-width: 768px) {
    justify-content: flex-start;
    grid-area: logo;
    padding: 0 16px;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`

export const SidebarLogoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--light-gold);
`

export const SidebarBrand = styled.span<{ $collapsed?: boolean }>`
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 4px;
  color: var(--light-gold);
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline-flex')};

  @media (max-width: 768px) {
    font-size: 18px;
    letter-spacing: 3px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    letter-spacing: 2px;
  }
`

export const SidebarNavSection = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  @media (max-width: 768px) {
    grid-area: nav;
  }
`

export const SidebarNav = styled.nav<{ $collapsed?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: ${({ $collapsed }) => ($collapsed ? 'center' : 'stretch')};

  @media (max-width: 768px) {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'flex')};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
    padding: 0 8px;
  }
`

export const SidebarToggleRow = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  width: 100%;
  padding: ${({ $collapsed }) => ($collapsed ? '0 12px' : '0')};
  margin-top: 6px;
`

export const SidebarItem = styled(Link)<{ $active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '14px')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  padding: ${({ $collapsed }) => ($collapsed ? '14px 12px' : '15px 20px')};
  color: var(--muted-gold);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  width: ${({ $collapsed }) => ($collapsed ? '100%' : 'auto')};
  border-left: 4px solid
    ${({ $active }) => ($active ? 'var(--muted-gold)' : 'transparent')};
  background-color: ${({ $active }) =>
    $active ? 'var(--hover-dark)' : 'transparent'};
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03),
    rgba(0, 0, 0, 0.18)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: var(--hover-dark);
  }

  svg {
    flex-shrink: 0;
    color: ${({ $active }) =>
      $active ? 'var(--light-gold)' : 'var(--muted-gold)'};
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 0;
    width: 52px;
    justify-content: center;
    border-left: none;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 9px;
    gap: 0;
    width: 46px;
  }
`

export const SidebarItemLabel = styled.span<{ $collapsed?: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline-flex')};
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--light-gold);

  @supports (-webkit-background-clip: text) or (background-clip: text) {
    background-image: var(--gold-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.5));
  }

  @media (max-width: 768px) {
    display: none;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

export const SidebarFooter = styled.div<{ $collapsed?: boolean }>`
  margin-top: auto;
  padding: ${({ $collapsed }) => ($collapsed ? '16px 12px' : '20px')};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    border-top: none;
    padding: 0 16px;
    margin-top: 0;
    grid-area: actions;
    align-items: flex-end;
    justify-self: end;
    align-self: center;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`

export const SidebarFooterRow = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  flex-direction: ${({ $collapsed }) => ($collapsed ? 'column' : 'row')};

  @media (max-width: 768px) {
    justify-content: flex-end;
    flex-wrap: nowrap;
    flex-direction: row;
  }
`

export const MainContent = styled.main<{ $collapsed?: boolean }>`
  flex: 1;
  margin-left: ${({ $collapsed }) => ($collapsed ? '90px' : '280px')};
  padding: 40px;
  min-height: 100vh;

  @media (max-width: 1024px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? '84px' : '240px')};
    padding: 30px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`

export const UserGreeting = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--light-gold);
  white-space: nowrap;

  ${({ $collapsed }) => $collapsed && 'display: none;'}

  @media (max-width: 768px) {
    display: none;
  }
`

export const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(226, 194, 142, 0.5);
  background: transparent;
  color: var(--light-gold);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(226, 194, 142, 0.12);
    border-color: rgba(226, 194, 142, 0.8);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(226, 194, 142, 0.35);
  }
`

export const LogoutLabel = styled.span<{ $collapsed?: boolean }>`
  ${({ $collapsed }) => $collapsed && 'display: none;'}

  @media (max-width: 640px) {
    display: none;
  }
`

export const SidebarToggle = styled.button<{
  $collapsed?: boolean
  $width?: string
  $height?: string
}>`
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? 'auto'};
  min-height: ${({ $height }) => $height ?? 'auto'};
  padding: ${({ $collapsed }) => ($collapsed ? '12px' : '12px 20px')};
  border: none;
  background-color: transparent;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03),
    rgba(10, 10, 10, 0.73)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.6);
  color: var(--muted-gold);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(226, 194, 142, 0.12);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(226, 194, 142, 0.35);
  }
`

export const SidebarToggleIcon = styled.span<{ $size?: string }>`
  width: ${({ $size }) => $size ?? '36px'};
  height: ${({ $size }) => $size ?? '36px'};
  border-radius: 8px;
  border: 1px solid rgba(226, 194, 142, 0.5);
  background: rgba(19, 19, 19, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: ${({ $size }) => $size ?? '32px'};
    height: ${({ $size }) => $size ?? '32px'};
  }
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem;
  border-radius: 9999px;
  border: 1px solid rgba(226, 194, 142, 0.5);
  background: transparent;
  color: var(--light-gold);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(226, 194, 142, 0.12);
    border-color: rgba(226, 194, 142, 0.8);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(226, 194, 142, 0.35);
  }
`

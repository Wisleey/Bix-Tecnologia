"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import {
  Home,
  LogOut,
  Menu,
  X,
  BarChart2,
  CreditCard,
  Settings,
  Users,
  HelpCircle,
} from "react-feather";
import { useAuth } from "@/contexts/auth-context";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  background-color: ${({ theme }) => theme.colors.sidebar};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    animation: ${({ $isOpen }) => ($isOpen ? slideIn : "none")} 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavSectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0.75rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight : "transparent"};
  text-decoration: none;
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryLight : theme.colors.hover};
  }
`;

const NavIcon = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textLight};
`;

const MobileMenuButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  display: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();

  // Fechar sidebar no mobile por padrão
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Definir estado inicial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <LogoIcon>F</LogoIcon>
            <LogoText>FinDash</LogoText>
          </Logo>
          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <NavSection>
            <NavSectionTitle>Menu Principal</NavSectionTitle>
            <NavList>
              <NavItem>
                <NavLink href="/dashboard" $active>
                  <NavIcon $active>
                    <Home size={20} />
                  </NavIcon>
                  Início
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <NavIcon>
                    <BarChart2 size={20} />
                  </NavIcon>
                  Relatórios
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <NavIcon>
                    <CreditCard size={20} />
                  </NavIcon>
                  Transações
                </NavLink>
              </NavItem>
            </NavList>
          </NavSection>

          <NavSection>
            <NavSectionTitle>Configurações</NavSectionTitle>
            <NavList>
              <NavItem>
                <NavLink href="#">
                  <NavIcon>
                    <Users size={20} />
                  </NavIcon>
                  Usuários
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <NavIcon>
                    <Settings size={20} />
                  </NavIcon>
                  Configurações
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <NavIcon>
                    <HelpCircle size={20} />
                  </NavIcon>
                  Ajuda
                </NavLink>
              </NavItem>
            </NavList>
          </NavSection>

          <SidebarFooter>
            <NavList>
              <NavItem>
                <NavLink href="#" onClick={handleLogout}>
                  <NavIcon>
                    <LogOut size={20} />
                  </NavIcon>
                  Sair
                </NavLink>
              </NavItem>
            </NavList>
          </SidebarFooter>
        </SidebarContent>
      </SidebarContainer>

      <MobileMenuButton onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </MobileMenuButton>
    </>
  );
}

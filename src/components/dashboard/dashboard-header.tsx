"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Bell, Settings } from "react-feather";
import { useAuth } from "@/contexts/auth-context";

const MainContent = styled.main`
  padding: 1rem;
  transition: margin 0.3s ease;

  @media (max-width: 640px) {
    display: none;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: 640px) {
    margin-left: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0.25rem 0 0 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 640px) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 8px;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

export default function DashboardHeader() {
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (!mounted) return null;

  return (
    <MainContent>
      <Header>
        <LeftSection>
          <Title>Dashboard Financeiro</Title>
          <Subtitle>Bem-vindo de volta, {user?.name?.split(" ")[0]}</Subtitle>
        </LeftSection>

        <RightSection>
          <IconButton>
            <Bell size={18} />
          </IconButton>
          <IconButton>
            <Settings size={18} />
          </IconButton>
          <UserInfo>
            <UserAvatar>{user?.name ? getInitials(user.name) : "U"}</UserAvatar>
            <UserName>{user?.name}</UserName>
          </UserInfo>
        </RightSection>
      </Header>
    </MainContent>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import styled, { keyframes } from "styled-components";
import { Lock, Mail } from "lucide-react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const waveMotion = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const WavesBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    120deg,
    rgb(13, 59, 25),
    rgb(10, 59, 102),
    rgb(77, 117, 11)
  );
  background-size: 400% 400%;
  animation: ${waveMotion} 10s ease infinite;
  opacity: 0.15;
  filter: blur(60px);
`;
const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BackgroundContainer = styled.div`
  flex: 1;
  background: url("/executivo-bg1.webp") no-repeat center left;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem 20rem 2rem 2rem;
  @media (max-width: 768px) {
    justify-content: center;
    background: #000;
    padding: 2rem;
  }
`;
const LoginCard = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.card};
  animation: ${fadeIn} 0.6s ease-out;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.verdeText};
  margin: 0;
`;

const LogoSubtext = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0.25rem 0 0 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Button = styled.button`
  padding: 0.875rem;
  background-color: rgb(9, 111, 0); // verde
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
  box-shadow: 0 0 10pxrgba (25, 152, 91, 0.4); // leve brilho já presente

  &:hover {
    background-color: rgb(3, 156, 41);
    box-shadow: 0 0 15pxrgba (6, 179, 0, 0.99), 0 0 30pxrgba (6, 172, 0, 0.67); // efeito neon no hover
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      // Simular atraso de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validação simples para fins de demonstração
      if (email === "user@exemplo.com" && password === "123123") {
        login({ name: "Usuário", email });
        router.push("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente user@exemplo.com / 123123");
      }
    } catch {
      setError("Ocorreu um erro durante o login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <WavesBackground />

      <BackgroundContainer>
        <LoginCard>
          <Logo>
            <LogoText>FinDash</LogoText>
            <LogoSubtext>Dashboard Financeiro</LogoSubtext>
          </Logo>

          <Title>Bem-vindo de volta</Title>
          <Subtitle>Faça login para acessar seu dashboard</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@exemplo.com"
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123123"
                />
              </InputWrapper>
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
        </LoginCard>
      </BackgroundContainer>
    </LoginContainer>
  );
}

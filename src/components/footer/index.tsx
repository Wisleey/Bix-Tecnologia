import styled from "styled-components";
import Image from "next/image";

const FooterContainer = styled.footer`
  background: linear-gradient(90deg, rgb(26, 34, 71) 0%, rgb(62, 76, 100) 100%);
  color: #fff;
  padding: 2rem 0;
  margin-top: auto;
`;

const LogoWrapper = styled.div`
  width: 180px;
  max-width: 100%;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(222, 220, 219, 0.9);
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;

  &:hover {
    color: #60a5fa;
  }
`;

const FooterText = styled.p`
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1.5rem 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgb(222, 220, 219, 0.9);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoWrapper>
        <Image
          src="/bix-tecnologia.png"
          alt="BIX Tecnologia"
          width={180}
          height={40}
          style={{ width: "100%", height: "auto" }}
        />
      </LogoWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Produtos</FooterTitle>
          <FooterLink href="#">Dashboard Financeiro</FooterLink>
          <FooterLink href="#">Análise de Investimentos</FooterLink>
          <FooterLink href="#">Gestão de Portfólio</FooterLink>
          <FooterLink href="#">Relatórios Personalizados</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Recursos</FooterTitle>
          <FooterLink href="#">Documentação</FooterLink>
          <FooterLink href="#">Tutoriais</FooterLink>
          <FooterLink href="#">API</FooterLink>
          <FooterLink href="#">Integrações</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterText>contato@findash.com</FooterText>
          <FooterText>(48) 9999-9999</FooterText>
          <FooterText>Florianópolis, SC</FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© 2025 FinDash. Todos os direitos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
} from '@react-email/components';

interface ConfirmationEmailProps {
    name: string;
    type: string;
}

const typeLabels: Record<string, string> = {
    auditoria: 'Auditoria Técnica',
    projeto: 'Novo Projeto',
    consultoria: 'Consultoria',
    outro: 'Outro Assunto',
};

export default function ConfirmationEmail({ name, type }: ConfirmationEmailProps) {
    const projectType = typeLabels[type] || type;

    return (
        <Html lang="pt">
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={brand}>RAMOS DIGITAL</Text>
                    </Section>

                    <Section style={content}>
                        <Heading style={heading}>Mensagem Recebida</Heading>

                        <Text style={paragraph}>
                            Olá {name},
                        </Text>

                        <Text style={paragraph}>
                            Recebi a sua mensagem relativamente a <strong>{projectType}</strong>.
                        </Text>

                        <Text style={paragraph}>
                            Vou analisar o seu pedido e entrarei em contacto brevemente.
                        </Text>

                        <Hr style={divider} />

                        <Text style={footer}>
                            Com os melhores cumprimentos,
                            <br />
                            <strong>Martim Ramos</strong>
                            <br />
                            <span style={footerBrand}>Ramos Digital</span>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#0a0a0b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '560px',
};

const header = {
    marginBottom: '32px',
};

const brand = {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '600' as const,
    letterSpacing: '0.2em',
    margin: '0',
};

const content = {
    backgroundColor: '#111111',
    borderRadius: '8px',
    padding: '40px',
    border: '1px solid #222222',
};

const heading = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600' as const,
    margin: '0 0 24px 0',
};

const paragraph = {
    color: '#d4d4d4',
    fontSize: '16px',
    lineHeight: '26px',
    margin: '0 0 16px 0',
};

const divider = {
    borderColor: '#333333',
    margin: '32px 0',
};

const footer = {
    color: '#888888',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0',
};

const footerBrand = {
    color: '#666666',
    fontSize: '12px',
};

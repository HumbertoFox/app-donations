import { ReactNode } from 'react';

export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;  // Tipando a prop 'children'
    disabled?: boolean;  // Definindo 'disabled' como opcional
    className?: string;   // Definindo 'className' como opcional
};

export interface TypeButtonProps extends SubmitButtonProps {
    type?: 'button' | 'submit' | 'reset';  // Tipando corretamente o 'type'
};

export interface IconsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: string | any; // O nome da classe de ícones para um Font Awesome ou qualquer biblioteca de ícones (por exemplo, 'fa-solid fa-eye')
    className?: string; // Nome de classe opcional para adicionar estilo personalizado
    title?: string; // Torna title opcional
};

export interface SessionPayload {
    username: string;
    email?: string;
    user_id?: string;
    [key: string]: unknown; // Caso precise de flexibilidade para adicionar mais propriedades no futuro
};

export interface UsernameProps {
    user: string | null;
};
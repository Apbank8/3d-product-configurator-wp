import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'default' | 'outline';
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.variant === 'default' && css`
    background: #2563eb;
    color: white;
    border: none;
    &:hover {
      background: #1d4ed8;
    }
  `}

  ${props => props.variant === 'outline' && css`
    background: transparent;
    border: 1px solid #d1d5db;
    color: #374151;
    &:hover {
      background: #f3f4f6;
    }
  `}

  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${props.variant === 'default' ? '#2563eb' : 'transparent'};
    }
  `}
`;

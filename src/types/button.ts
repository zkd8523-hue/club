import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'secondary';
    fullWidth?: boolean;
    size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
    className?: string;
}

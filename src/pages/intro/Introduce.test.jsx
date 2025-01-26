import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Introduce from './Introduce';

vi.mock('react-router-dom', async () => {
const actual = await import ('react-router-dom');
return {
    ...actual,
    useNavigate: vi.fn(),
};
});

describe('Introduce Component', () => {
    it('renders main logo image', () => {
        render(
            <MemoryRouter>
                <Introduce />
            </MemoryRouter>
        );
        const logo = screen.getByAltText('');
        expect(logo).toBeInTheDocument();
        expect(logo.src).toBe('https://quiz2.app.appery.io/assets/images/mainLogo.png');
    });

    it('renders start button and text', () => {
        render(
            <MemoryRouter>
                <Introduce />
            </MemoryRouter>
        );
        const button = screen.getByRole('button', { name: /Question App'e başla/i});
        const spanText = screen.getByText(/Testte Toplamda 10 soru bulunmakta/i);

        expect(button).toBeInTheDocument();
        expect(spanText).toBeInTheDocument();
    });

    it('navigates to /Quiz on button click', () => {
        const mockNavigate = vi.fn();
        useNavigate.mockImplementation(() => mockNavigate);
        render(
            <MemoryRouter>
                <Introduce />
            </MemoryRouter>
        );
        const button = screen.getByRole('button', { name: /Question App'e başla/i});
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith('/Quiz');
    });
});
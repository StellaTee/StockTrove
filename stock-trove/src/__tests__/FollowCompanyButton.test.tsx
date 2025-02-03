import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YourComponent from '../YourComponent';

describe('<YourComponent />', () => {
    test('it should mount', () => {
        render(<YourComponent />);
        
        const yourComponent = screen.getByTestId('YourComponent');

        expect(yourComponent).toBeInTheDocument();
    });
});
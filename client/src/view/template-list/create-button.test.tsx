import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from './create-button';

test('renders non extended', () => {
  const handleClick = jest.fn();
  const { queryByText } = render(<Button extended={false} onClick={handleClick} />);
  const element = queryByText('Create a template');
  expect(element).toBeNull();
});

test('renders extended', () => {
  const handleClick = jest.fn();
  const { queryByText } = render(<Button extended onClick={handleClick} />);
  const element = queryByText('Create a template');
  expect(element).toBeInTheDocument();
});

test('click propagates', () => {
  const handleClick = jest.fn();
  const { container } = render(<Button onClick={handleClick} />);
  const btn = container.querySelector('button');
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn as Element);
  expect(handleClick).toHaveBeenCalled();
});

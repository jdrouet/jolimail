import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { findByTestId, findByText, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

[
  { name: 'regular button', element: <button data-testid="clickme">click me</button> },
  {
    name: 'icon button',
    element: (
      <IconButton data-testid="clickme">
        <DeleteIcon />
      </IconButton>
    ),
  },
].forEach(({ name, element }) => {
  test(`handle accept button with ${name}`, async () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Element onConfirmedClick={handleClick} title="This is a title" description="This is a description">
        {element}
      </Element>,
    );
    const openButton = await findByTestId(container, 'clickme');
    expect(openButton).toBeVisible();
    fireEvent.click(openButton);
    expect(await findByText(document.body, 'This is a title')).toBeVisible();
    expect(await findByText(document.body, 'This is a description')).toBeVisible();
    const acceptButton = await findByText(document.body, 'OK');
    expect(await findByText(document.body, 'OK')).toBeVisible();
    fireEvent.click(acceptButton);
    expect(acceptButton).not.toBeVisible();
    expect(handleClick).toHaveBeenCalled();
  });

  test(`handle cancel button with ${name}`, async () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Element onConfirmedClick={handleClick} title="This is a title" description="This is a description">
        {element}
      </Element>,
    );
    const openButton = await findByTestId(container, 'clickme');
    expect(openButton).toBeVisible();
    fireEvent.click(openButton);
    expect(await findByText(document.body, 'This is a title')).toBeVisible();
    expect(await findByText(document.body, 'This is a description')).toBeVisible();
    const cancelButton = await findByText(document.body, 'Cancel');
    expect(await findByText(document.body, 'Cancel')).toBeVisible();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeVisible();
    expect(handleClick).not.toHaveBeenCalled();
  });
});

import { toMrml } from './service';

describe('toMrml', () => {
  it('should convert simple element', () => {
    expect(
      toMrml({
        type: 'button',
        properties: {},
        children: 'Click me',
      }),
    ).toBe('<mj-button>Click me</mj-button>');
  });

  it('should convert element with props', () => {
    expect(
      toMrml({
        type: 'button',
        properties: {
          padding: '10px 25px',
        },
        children: 'Click me',
      }),
    ).toBe('<mj-button padding="10px 25px">Click me</mj-button>');
  });
});

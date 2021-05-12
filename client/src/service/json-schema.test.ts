import { renderHook } from '@testing-library/react-hooks';

import { useValidation, validate } from './json-schema';

const DATA = '{"type":"object","properties":{"username":{"type":"string"}}}';

describe('useValidation', () => {
  it('should return nothing', () => {
    const hook = renderHook(() => useValidation(DATA));
    expect(hook.result.current).toBeUndefined();
  });

  it('should return the error', async () => {
    const hook = renderHook(() => useValidation('{"'));
    await hook.waitForNextUpdate();
    expect(hook.result.current).not.toBeUndefined();
  });
});

describe('validate', () => {
  it('should validate attributes', async () => {
    const error = await validate(DATA);
    expect(error).toBeUndefined();
  });

  it('should validate bad attributes', async () => {
    const error = await validate('{"');
    expect(error).not.toBeUndefined();
  });
});

import { useMemo } from 'react';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';

zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

export default function usePasswordStrength(password: string): number {
  return useMemo(() => {
    const passwordStrength = zxcvbn(password).score;
    return passwordStrength;
  }, [password]);
}

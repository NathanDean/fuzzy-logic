import { useMemo } from 'react';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';

zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

const strength_config = [
  { score: 0, label: 'Very Weak', color: 'bg-red-500' },
  { score: 1, label: 'Weak', color: 'bg-orange-500' },
  { score: 2, label: 'Fair', color: 'bg-yellow-500' },
  { score: 3, label: 'Good', color: 'bg-lime-500' },
  { score: 4, label: 'Strong', color: 'bg-green-500' },
];

export default function usePasswordStrength(password: string) {
  return useMemo(() => {
    const passwordStrength = zxcvbn(password).score;
    return strength_config[passwordStrength];
  }, [password]);
}

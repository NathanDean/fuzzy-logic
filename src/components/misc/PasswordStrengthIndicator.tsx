import { useState, useEffect } from 'react';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Text from '../ui/Text';

zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PasswordStrengthIndicatorProps {
  password: string;
  onStrengthChange?: (score: number) => void;
}

const STRENGTH_CONFIG = [
  { label: 'Very Weak', color: 'bg-red-500' },
  { label: 'Weak', color: 'bg-orange-500' },
  { label: 'Fair', color: 'bg-yellow-500' },
  { label: 'Good', color: 'bg-lime-500' },
  { label: 'Strong', color: 'bg-green-500' },
];

export default function PasswordStrengthIndicator({
  password,
  onStrengthChange,
}: PasswordStrengthIndicatorProps) {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  useEffect(() => {
    const score = password ? zxcvbn(password).score : 0;
    setPasswordStrength(score);
    if (onStrengthChange) onStrengthChange(score);
  }, [password, onStrengthChange]);

  const config = STRENGTH_CONFIG[passwordStrength] || {
    label: '',
    color: 'bg-gray-300',
  };

  return (
    <div className="flex flex-col justify-start zxcvbn">
      <div>
        <Text as="span">Password strength: </Text>
        {password && config.label}
      </div>

      <div className="bg-gray-300 w-full h-2.5 rounded-full">
        <div
          className={cn(
            'h-2.5 rounded-full transition-all duration-300',
            password ? config.color : 'bg-gray-300'
          )}
          style={{ width: password ? `${(passwordStrength + 1) * 20}%` : '0%' }}
        />
      </div>
    </div>
  );
}

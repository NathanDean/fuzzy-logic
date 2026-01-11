import cn from '@/utils/style/cn';

import Text from '../../ui/Text';

const STRENGTH_CONFIG = [
  { label: 'Very Weak', colour: 'bg-red-500' },
  { label: 'Weak', colour: 'bg-orange-500' },
  { label: 'Fair', colour: 'bg-yellow-500' },
  { label: 'Good', colour: 'bg-lime-500' },
  { label: 'Strong', colour: 'bg-green-500' },
];

export function PasswordStrengthLabel({ score }: { score: number }) {
  const { label } = STRENGTH_CONFIG[score];

  return (
    <div>
      <Text as="span">Password strength: </Text>
      {label}
    </div>
  );
}

export function PasswordStrengthBar({ score }: { score: number }) {
  const { colour } = STRENGTH_CONFIG[score];

  return (
    <div className="bg-gray-300 w-full h-2.5 rounded-full">
      <div
        className={cn(
          'h-2.5 rounded-full transition-all duration-300',
          score ? colour : 'bg-gray-300'
        )}
        style={{ width: score ? `${(score + 1) * 20}%` : '0%' }}
      />
    </div>
  );
}

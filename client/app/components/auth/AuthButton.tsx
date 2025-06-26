'use client';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface AuthButtonProps {
  provider: string;
}

export function AuthButton({ provider }: AuthButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => signIn(provider)}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
    >
      {t(`login.signInWith${provider.charAt(0).toUpperCase() + provider.slice(1)}`)}
    </button>
  );
}

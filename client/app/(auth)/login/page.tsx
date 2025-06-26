'use client';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { AuthButton } from '@/components/auth/AuthButton';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h1>
        <AuthButton provider="dropbox" />
      </div>
    </div>
  );
}

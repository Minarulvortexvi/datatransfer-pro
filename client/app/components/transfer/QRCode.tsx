'use client';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';

interface QRCodeProps {
  transferId: string;
}

export function QRCode({ transferId }: QRCodeProps) {
  const { t } = useTranslation();
  const qrValue = `${process.env.NEXT_PUBLIC_BASE_URL}/transfer/status/${transferId}`;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">{t('transfer.qr.title')}</h2>
      <QRCode value={qrValue} size={200} />
    </div>
  );
}

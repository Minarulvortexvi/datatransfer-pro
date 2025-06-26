'use client';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';

interface QRCodeProps {
  transferId: string;
  sharedLink?: string;
}

export function QRCode({ transferId, sharedLink }: QRCodeProps) {
  const { t } = useTranslation();
  const qrValue = sharedLink || `${process.env.NEXT_PUBLIC_BASE_URL}/transfer/receive/${transferId}`;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">{t('transfer.qr.title')}</h2>
      <QRCode value={qrValue} size={200} />
      {sharedLink && (
        <a href={sharedLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
          {t('transfer.qr.download')}
        </a>
      )}
    </div>
  );
}

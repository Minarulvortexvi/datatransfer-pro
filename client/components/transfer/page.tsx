'use client';
import { useState } from 'react';
import { FileDropzone } from '@/components/transfer/FileDropzone';
import { QRCode } from '@/components/transfer/QRCode';
import { ProgressBar } from '@/components/transfer/ProgressBar';
import { useTranslation } from 'react-i18next';

export default function TransferPage() {
  const { t } = useTranslation();
  const [transferData, setTransferData] = useState<{ transferId: string; sharedLink?: string } | null>(null);

  const handleTransferStart = (transferId: string, sharedLink?: string) => {
    setTransferData({ transferId, sharedLink });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{t('transfer.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FileDropzone onTransferStart={handleTransferStart} />
        </div>
        <div>
          {transferData && (
            <>
              <QRCode transferId={transferData.transferId} sharedLink={transferData.sharedLink} />
              <ProgressBar transferId={transferData.transferId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

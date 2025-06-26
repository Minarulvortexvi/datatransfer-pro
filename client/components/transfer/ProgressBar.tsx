'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  transferId: string;
}

export function ProgressBar({ transferId }: ProgressBarProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>('pending');
  const [sharedLink, setSharedLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`/api/transfer/status/${transferId}`);
        setStatus(response.data.status);
        setSharedLink(response.data.sharedLink);
      } catch (error) {
        console.error('Status fetch failed:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [transferId]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">{t('transfer.status.title')}</h2>
      <p>{t('transfer.status.label')}: {status}</p>
      {sharedLink && (
        <a href={sharedLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
          {t('transfer.qr.download')}
        </a>
      )}
    </div>
  );
}

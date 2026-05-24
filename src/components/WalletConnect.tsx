import { useState } from 'react';
import { isConnected, requestAccess, getAddress } from '@stellar/freighter-api';

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function connectWallet() {
    setLoading(true);
    setError(null);
    try {
      const connected = await isConnected();
      if (!connected.isConnected) {
        setError('Freighter not found. Please install it.');
        return;
      }
      await requestAccess();
      const addressObj = await getAddress();
      if (addressObj.error) {
        setError('Failed to get address.');
        return;
      }
      setAddress(addressObj.address);
    } catch {
      setError('Failed to connect wallet.');
    } finally {
      setLoading(false);
    }
  }

  function truncate(addr: string) {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  }

  return (
    <div>
      {address ? (
        <div style={{ backgroundColor: '#1a1a1a', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', color: '#22c55e' }}>
          ✅ {truncate(address)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}
import BountyCard from './BountyCard';

interface Issue {
  id: number;
  number: number;
  title: string;
  description?: string;
  bountyAmount: number;
  tokenType: string;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed' | 'expired';
  labels: string[];
}

interface IssueFeedProps {
  issues: Issue[];
  loading?: boolean;
}

export default function IssueFeed({ issues, loading = false }: IssueFeedProps) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
        Loading issues...
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
        No issues found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Open Bounties</h2>
      {issues.map((issue) => (
        <BountyCard
          key={issue.id}
          title={`#${issue.number} — ${issue.title}`}
          description={issue.description}
          bountyAmount={issue.bountyAmount}
          tokenType={issue.tokenType}
          deadline={issue.deadline}
          status={issue.status}
        />
      ))}
    </div>
  );
}
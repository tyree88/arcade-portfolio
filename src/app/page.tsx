import ClientExperienceLoader from '@/components/ClientExperienceLoader';

// page.tsx remains a Server Component by default

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Render the Client Component that handles dynamic loading */}
      <ClientExperienceLoader />
    </main>
  );
}
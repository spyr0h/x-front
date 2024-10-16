import VideoCard from '@/components/VideoCard';

export const dynamic = 'force-dynamic';  // TODO : ISR

async function getSearchResults(fullUrl) {
  const res = await fetch('http://139.99.61.232:8080/api/page/search/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: fullUrl }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data from the API');
  }

  return res.json();
}

export default async function SearchPage({ searchParams }) {
  const queryString = new URLSearchParams(searchParams).toString();
  const fullUrl = `/video/search?${queryString}`;

  console.log(fullUrl);

  if (!queryString) {
    return <p>Veuillez fournir des paramètres de recherche valides.</p>;
  }

  const data = await getSearchResults(fullUrl);

  const videos = data.searchResult.videos;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Résultats de recherche</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

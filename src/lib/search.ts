
interface SearchResult {
    title: string;
    link: string;
    snippet: string;
    source: string;
    date?: string;
    favicon?: string;
    position: number;
}

export interface SearchResponse {
    results: SearchResult[];
    error?: string;
}

const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;

export async function searchWeb(query: string): Promise<SearchResponse> {
    if (!SERPAPI_KEY) {
        console.warn('VITE_SERPAPI_KEY is missing');
        return { results: [], error: 'Configuration missing' };
    }

    try {
        const params = new URLSearchParams({
            engine: 'google',
            q: query,
            api_key: SERPAPI_KEY,
            num: '8', // Top 8 results for context
        });

        const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`SerpAPI error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const results = (data.organic_results || []).map((result: any, index: number) => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
            source: result.source || new URL(result.link).hostname,
            date: result.date,
            favicon: result.favicon, // SerpApi often provides this
            position: index + 1
        }));

        return { results };
    } catch (error) {
        console.error('Search failed:', error);
        return {
            results: [],
            error: error instanceof Error ? error.message : 'Unknown search error'
        };
    }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchStockHistory(symbol: string) {
  try {
    const response = await fetch(`${API_URL}/api/predict/${symbol}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock history:", error);
    return null;
  }
}

export async function fetchStockHistory(symbol: string) {
  try {
    const response = await fetch(`http://localhost:8000/api/predict/${symbol}`);
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

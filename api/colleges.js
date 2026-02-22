export default async function handler(req, res) {
  const { country } = req.query;

  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
}
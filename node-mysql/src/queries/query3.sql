-- Create a view and query it
SELECT m.title, m.year, a.name AS producer
FROM Movie m
JOIN Artist a ON m.producerId = a.artistId
WHERE m.genre = 'Comedy';
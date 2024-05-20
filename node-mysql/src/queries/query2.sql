-- Complex query 2
SELECT a.name, r.roleName, m.title
FROM Artist a
JOIN Role r ON a.artistId = r.actorId
JOIN Movie m ON r.movieId = m.movieId
WHERE m.genre = 'Action';

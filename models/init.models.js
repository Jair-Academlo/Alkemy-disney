//Models
const { Character } = require('./character.model');
const { Movies } = require('./movie.model');
const { Genre } = require('./genre.model');
const { CharacterMovies } = require('./characterMovie.model');
const { CharacterImg } = require('./imgs.models/characterImg');
const { GenreImg } = require('./imgs.models/genreImg');
const { MovieImg } = require('./imgs.models/movieImg');

//Relations Models
const initModels = () => {
  // M Characters <----> M Movies
  Character.belongsToMany(Movies, { through: CharacterMovies });
  Movies.belongsToMany(Character, { through: CharacterMovies });

  // 1 Genre <----> M Movies
  Genre.hasMany(Movies);
  Movies.belongsTo(Genre);

  // 1 Character <----> M CharacterImg
  Character.hasMany(CharacterImg, { foreignKey: 'characterId' });
  CharacterImg.belongsTo(Character);

  // 1 Genre <----> M GenreImg
  Genre.hasMany(GenreImg, { foreignKey: 'genreId' });
  GenreImg.belongsTo(Genre);

  // 1 Movies <----> M MoviesImg
  Movies.hasMany(MovieImg, { foreignKey: 'movieId' });
  MovieImg.belongsTo(Movies);
};

module.exports = { initModels };

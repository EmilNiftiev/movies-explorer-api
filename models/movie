const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    required: [true, 'Поле "страна создания фильма" должно быть заполнено'],
    type: String,
  },
  director: {
    required: [true, 'Поле "режиссёр фильма" должно быть заполнено'],
    type: String,
  },
  duration: {
    required: [true, 'Поле "длительность фильма" должно быть заполнено'],
    type: String,
  },
  year: {
    required: [true, 'Поле "год выпуска фильма" должно быть заполнено'],
    type: String,
  },
  description: {
    required: [true, 'Поле "описание фильма" должно быть заполнено'],
    type: String,
  },
  image: {
    required: [true, 'Поле "ссылка на постер к фильму" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    required: [true, 'Поле "ссылка на трейлер фильма" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    required: [true, 'Поле "миниатюрное изображение постера к фильму" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: [true, 'Поле "название фильма на русском языке" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  nameEN: {
    required: [true, 'Поле "название фильма на английском языке" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
}, { versionKey: false }); // Убираем отслеживание версии схемы ("__v" в объекте)

module.exports = mongoose.model('movie', movieSchema);

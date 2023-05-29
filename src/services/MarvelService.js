import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = '01f2e2e123368220041720582fe584a4';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (data) => {
    let descr = data.description ? data.description : 'No Data';
    descr = descr.length > 255 ? descr.slice(255) + '...' : descr;
    return {
      name: data.name,
      description: descr,
      thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
      homepage: data.urls[0].url,
      wiki: data.urls[1].url,
      id: data.id,
      comics: data.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacter };
};

export default useMarvelService;

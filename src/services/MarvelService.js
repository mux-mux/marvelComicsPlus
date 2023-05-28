class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = '01f2e2e123368220041720582fe584a4';
  _baseOffset = 210;
  getResource = async (url) => {
    const res = await fetch(url);
    //fetch only OK when status 200-299
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (data) => {
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
}

export default MarvelService;

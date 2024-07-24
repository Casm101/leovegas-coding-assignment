export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (API_KEY === undefined) throw new Error('Missing API KEY in .env file.');

export const ENDPOINT = 'https://api.themoviedb.org/3';
export const ENDPOINT_DISCOVER = ENDPOINT + '/discover/movie?api_key=' + API_KEY + '&sort_by=vote_count.desc';
export const ENDPOINT_SEARCH = ENDPOINT + '/search/movie?api_key=' + API_KEY;
export const ENDPOINT_MOVIE = (id: string) => ENDPOINT + `/movie/${id}?api_key=` + API_KEY + '&append_to_response=videos';
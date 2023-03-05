import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = () => {
  return { type: FAV_ADD };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};
export const fetchLoading = (truefalsedegeri) => {
  // console.log("222");
  return { type: FETCH_LOADING, payload: truefalsedegeri };
};
export const fetchSucces = (data) => {
  // console.log("444");
  return { type: FETCH_SUCCESS, payload: data };
};

export const fetchAnother = () => (dispatch) => {
  // console.log("1111");
  dispatch(fetchLoading(true));

  axios
    .get("https://official-joke-api.appspot.com/jokes/programming/random")
    .then((response) => {
      dispatch(fetchSucces(response.data[0]));
      // console.log(response.data[0]);
      dispatch(fetchLoading(false));
    })
    .catch((error) => dispatch({ type: FETCH_ERROR, payload: error }));
};

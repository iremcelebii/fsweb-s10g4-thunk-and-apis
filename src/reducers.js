import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
  butonTrueFalseDegeri: false,
};

function writeFavsToLocalStorage(state) {
  //!state demenin bir önemi yok
  //!ama aşağıda state.favs demen önemli
  // console.log(state);
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      // console.log("favJoke.id");
      // console.log(favJoke.id);
      // console.log(state.favs.map((fav) => fav.id));
      let favJoke = state.current;

      writeFavsToLocalStorage({
        ...state,
        favs: [...state.favs, favJoke],
      });
      return {
        ...state,
        butonTrueFalseDegeri: false,
        favs: [...state.favs, favJoke],
      };

    case FAV_REMOVE:
      console.log("state.favs");
      console.log(state.favs);
      const filtlenmisFav = state.favs.filter(
        (joke) => joke.id !== Number(action.payload)
      );
      writeFavsToLocalStorage({ ...state, favs: filtlenmisFav });

      return { ...state, favs: filtlenmisFav };

    case FETCH_SUCCESS:
      // console.log("555");
      return {
        ...state,

        butonTrueFalseDegeri: true,
        current: action.payload,
      };

    case FETCH_LOADING:
      // console.log("333");
      return { ...state, loading: action.payload };

    case FETCH_ERROR:
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
}

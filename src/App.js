import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnother, getFavsFromLocalStorage } from "./actions";
import { addFav } from "./actions";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
  }, []);
  const loading = useSelector((depo) => depo.loading);
  const current = useSelector((depo) => depo.current);
  // console.log(current);
  const favs = useSelector((depo) => depo.favs);

  let butonTrueFalseDegeri = useSelector((depo) => depo.butonTrueFalseDegeri);
  function addToFavs(fav) {
    // console.log("fav");
    // console.log(fav.target);
    // toast("app te de yazabilirdik");
    dispatch(addFav());
    // console.log(state.favs.map((fav) => fav.id));
  }
  console.log(butonTrueFalseDegeri);
  function fetchAnotherFonk() {
    // console.log("000");
    dispatch(fetchAnother());
  }
  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            {current && (
              <button
                onClick={fetchAnotherFonk}
                className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              >
                Başka bir tane
              </button>
            )}
            {!current && (
              <button
                onClick={fetchAnotherFonk}
                className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              >
                Şaka Getir
              </button>
            )}

            {butonTrueFalseDegeri && (
              <button
                onClick={addToFavs}
                className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
              >
                Favorilere ekle
              </button>
            )}
            <ToastContainer />
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => <FavItem key={item.id} item={item} />)
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

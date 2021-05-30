import { combineReducers } from "redux";

const UserGlobal = {
  username: "",
  nama: "",
  jenisKelamin: "",
  nomor: "",
  umur: "",
  foto: "",
  latitude: "",
  longitude: "",
  isLogin: false,
};

const UserReducer = (state = UserGlobal, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      [action.tipeInput]: action.valueInput,
    };
  }
  return state;
};

const Reducer = combineReducers({
  UserReducer,
});

export default Reducer;

import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "../callbacks/Search";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const searchInput = useRef(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);
  // const filteredUsers = characters.filter((user) => {
  // return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search] //los elements que van a cambiar
  );
  return (
    <div>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      <div>
        {favorites.favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </div>
      {filteredUsers.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button onClick={() => handleClick(character)}>favorite </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;

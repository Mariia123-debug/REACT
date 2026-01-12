import { SET_FILTER } from "./actions";

const initialState = {
  filter: "",
  users: [
    { id: 1, name: "Anna" },
    { id: 2, name: "Michael" },
    { id: 3, name: "Olena" },
    { id: 4, name: "John" },
    { id: 5, name: "Maria" },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}
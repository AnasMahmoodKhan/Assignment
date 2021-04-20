import axios from "axios";
export default {
  fetchTodos: async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res)
      .catch((err) => err);
  },
};

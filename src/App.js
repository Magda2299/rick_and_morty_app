import "./App.css";
import { SearchProvider } from "./Context/SearchContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  );
}

export default App;

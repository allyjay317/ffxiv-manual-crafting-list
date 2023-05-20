import "./App.css";

import { RecipeContextProvider } from "./context/RecipeContext";
import { RecipeList } from "./components/Views/Recipe/RecipeList";
import { MaterialList } from "./components/Views/Material/MaterialList";
import { ModalController } from "./components/Modals/ModalController";

function App() {
  return (
    <div className="App">
      <RecipeContextProvider>
        <ModalController />
        <RecipeList />

        <MaterialList isEditable />
      </RecipeContextProvider>
    </div>
  );
}

export default App;

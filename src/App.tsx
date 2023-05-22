import { ModalController } from './components/Modals/ModalController'
import { MaterialList } from './components/Views/Material/MaterialList'
import { RecipeList } from './components/Views/Recipe/RecipeList'
import { RecipeContextProvider } from './context/RecipeContext'

import './App.css'

export function App() {
  return (
    <div className="App">
      <RecipeContextProvider>
        <ModalController />
        <RecipeList />

        <MaterialList isEditable />
      </RecipeContextProvider>
    </div>
  )
}

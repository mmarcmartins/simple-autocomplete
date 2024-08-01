import { useMemo } from 'react';
import { CustomAutoComplete } from './components/CustomAutoComplete';
import { useFetchRequest } from './hooks/useFetchRequest';

function App() {  
  const {data: items, loading, error} = useFetchRequest<{email: string}[]>('https://jsonplaceholder.typicode.com/comments')

  const transformItems = useMemo(() => items ? items.map(({email}) => email) : [],[items]);

  if(loading) {
    return <h2>...Loading</h2>
  }

  if(error) {
    return <h2>An error has occurred</h2>
  }
  if(!items){
    return <h2>No emails found</h2>
  }

  return (
    <main className="container">
      <h1>Custom autocomplete</h1>      
      <CustomAutoComplete items={transformItems}/>        
    </main>
  )
}

export default App

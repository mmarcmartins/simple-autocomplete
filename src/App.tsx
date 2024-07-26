import { useEffect, useState } from 'react';
import { CustomAutoComplete } from './components/CustomAutoComplete';

const getEmails = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data : {email: string}[] = await response.json();
  return data;  
};

function App() {
  const [items, setItems] = useState<string[]>([]);
  const getItems = async () =>{
    const emails = await getEmails();
    setItems(emails.map((curr) => curr.email));    
  }

  useEffect(() => {
    getItems();
  }, [])
  
  return (
    <main className="container">
      <h1>Custom autocomplete</h1>
      {items.length > 0 ? (
        <>        
         <CustomAutoComplete items={items}/>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  )
}

export default App

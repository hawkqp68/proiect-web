import {useState} from 'react';

function ToDoList()
{
    const[todos, setTodos] = useState([]);
    const[input, setInput] = useState('');

    function handleAdd()
    {
        if (input.trim() === '') return; // Nu adauga text gol
          setTodos([...todos, input]); // Creeaza array NOU cu tot ce era + input
          setInput(''); 
    }
return (
 <div>
 <h3>Todo List</h3>
 <input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Adauga un task..."
 />
 <button onClick={handleAdd}>Adauga</button>
       {        <ul>
                {todos.map((todo, index) => ( <li key={index}>{todo}</li>))}
            </ul>
            
       }
 </div>
 );
}
export default ToDoList;
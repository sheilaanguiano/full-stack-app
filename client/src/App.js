import './App.css';
import Test from './components/Test';




function App() {
  fetch('http://localhost:5000/api/courses')
   .then(response => response.json())
   .then(data => console.log(data));
  return (
    <Test />
  );
}

export default App;

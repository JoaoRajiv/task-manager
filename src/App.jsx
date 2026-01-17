import Task from './components/Task';

export default function App() {
  const name = 'test';
  console.log(`Hello, ${name}!`);
  return (
    <div>
      <Task />
    </div>
  );
}

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { pages } from './pages';

export default function App() {
  return (
    <Router>
      <Routes>
        {pages.map((page) => (
          <Route key={page.name} path={page.path} element={<page.Component />} />
        ))}
      </Routes>
    </Router>
  );
}

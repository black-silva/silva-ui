import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Home } from './pages/Home';

export function App() {
  const page = window.location.pathname === '/about' ? <About /> : <Home />;

  return <Layout>{page}</Layout>;
}

import './styles.css';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="link" className="admin-nav-link active">
            <p>Produtos</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-link">
            <p>Categorias</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-link">
            <p>Usuários</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

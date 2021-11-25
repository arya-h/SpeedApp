import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/SpeedApp-Icon.png";
import { types } from "../../types/types";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const removeUnderline = { textDecoration: "none" };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          <img src={logo} width="48" height="48" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="">
                Speed App
              </a>
            </li>
            {/* <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li> */}
          </ul>
          <div className="pe-5">
          <Link to="/add">
              <a href="#" className="card-link text-white fa-2x" style={removeUnderline}>
              <i className="far fa-plus-square"></i>
              </a>
              </Link>
            </div>
          <form className="d-flex">
            <input
              value={filter}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) =>
                dispatch({
                  type: types.updateFilter,
                  payload: event.target.value,
                })
              }
            ></input>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

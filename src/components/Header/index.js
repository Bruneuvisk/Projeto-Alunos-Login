import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as actions from '../../store/modules/auth/actions'
import history from "../../services/history";
import { useDispatch } from "react-redux";

import { Nav } from './styled'

export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = e => {
    e.preventDefault();
    dispatch(actions.loginFailure());

    history.push('/');
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaSignInAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link to="logout" onClick={handleLogout}>
          <FaPowerOff size={24} />
        </Link>
        ) : (
        <Link to="/login">
              <FaUserAlt size={24} />
        </Link>
      )}

      {isLoggedIn && (<FaCircle size={24} color="#66ff33" />)}
    </Nav>
  );
}

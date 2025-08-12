import { Link } from "react-router";

import { Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";


//  <nav>
//       {/* NavLink makes it easy to show active states */}
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive ? "active" : ""
//         }
//       >
//         Home
//       </NavLink>

//       <Link to="/concerts/salt-lake-city">Home</Link>
//     </nav>


const Header = () => {
  return (
     <Navbar fluid rounded>
        <Link to="/">Home</Link>
      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/inventory">Inventarios</Link>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header
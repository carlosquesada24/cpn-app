import { NavLink, Link } from "react-router";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";


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
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <Link to="/">Home</Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/inventory">Inventarios</Link>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header
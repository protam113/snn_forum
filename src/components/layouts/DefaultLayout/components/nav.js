import { Link } from "react-router-dom";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import Logo from "../../../../assets/img/logoH2H.svg";
import { useTheme } from "../../../../context/themeContext";
import LogoutButton from "../../../../pages/auth/logout";
import { BiMenuAltRight } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import LoginBtn from "../../../buttons/loginBtn";
import { useUser } from "../../../../context/UserProvider";
import { FaCog } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useWeb } from "../../../../hooks/useWeb";

const NavLinkItem = ({ to, children, theme }) => {
  return (
    <Link
      to={to}
      className={`relative group px-8 py-2 transition-all  ${
        theme === "light"
          ? "text-black hover:text-dark-blue2"
          : "text-white hover:text-gray-300"
      } flex items-center`}
    >
      <span className="text-16 font-bold">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

const NavLinkMobile = ({ to, children, theme }) => {
  return (
    <Link
      to={to}
      className={`relative group block px-4 py-2 transition-all md:hidden ${
        theme === "light"
          ? "text-black hover:text-gray-400"
          : "text-black hover:text-gray-400"
      }`}
    >
      <span className="text-14">{children}</span>
    </Link>
  );
};

const TopHeader = () => {
  const { data: web, error, isLoading } = useWeb();

  return (
    <section
      className={`py-2 bg-main-blue1 text-white text-right px-9 ${
        isLoading || error ? "visibility-hidden" : ""
      }`}
      style={{ minHeight: "40px" }}
    >
      {isLoading && <div className="text-main-blue1">Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <p className="text-12">
          <strong className="mx-3">Địa chỉ:</strong> {web?.location || null}
          <strong className="mx-3">Số điện thoại:</strong> {web?.phone_number}
        </p>
      )}
    </section>
  );
};

const Nav = () => {
  const { theme } = useTheme();
  const { userRoles, userInfo } = useUser();

  const isAdmin = userRoles.includes("admin") || userRoles.includes("manager");

  return (
    <div
      className={`w-full min-h-14 sticky top-0 z-50 ${
        theme === "light" ? "bg-white-blue1" : "bg-zinc-900"
      }`}
    >
      <TopHeader />
      <div className="mx-auto flex w-full max-w-7xl justify-between px-8 py-2 text-16">
        <section className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" id="logo" className="mr-2" />
            <div className="text-lg">
              <span
                className={`${
                  theme === "light" ? "text-dark-blue2 " : "text-milk-blue1"
                } font-bold`}
              >
                H2H Tech
              </span>{" "}
              <span
                className={`font-semibold  ${
                  theme === "light" ? "text-black" : "text-white"
                }
                `}
              >
                Energy
              </span>
            </div>
          </Link>
        </section>

        <section className="flex-1 hidden md:flex justify-center items-center space-x-8">
          <NavLinkItem to="/" theme={theme}>
            Blog
          </NavLinkItem>
          <NavLinkItem to="/san_pham" theme={theme}>
            Sản Phẩm
          </NavLinkItem>
          <NavLinkItem to="/tuyen_dung" theme={theme}>
            Tuyển dụng
          </NavLinkItem>
          {isAdmin && (
            <NavLinkItem to="/admin" theme={theme}>
              Admin
            </NavLinkItem>
          )}
        </section>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 ">
              {!userInfo ? (
                <BiMenuAltRight
                  className={`font-semibold text-2xl ${
                    theme === "light" ? "text-zinc-900" : "text-white"
                  }`}
                />
              ) : (
                <div className="flex items-center">
                  <img
                    src={userInfo.profile_image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                </div>
              )}
              <IoIosArrowDown
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            as="div"
            className="absolute right-0 z-10 mt-1 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-2 space-y-4">
              <MenuItem as="div">
                {userInfo && (
                  <Link
                    to={`/profile/${userInfo.id}`}
                    className="flex items-center space-x-6 px-6 py-1 text-black hover:bg-white-blue2"
                  >
                    <img
                      src={userInfo.profile_image}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    <span>Trang cá nhân</span>
                  </Link>
                )}
              </MenuItem>

              <MenuItem as="div">
                {userInfo && (
                  <Link
                    to="/manage"
                    className="bg-main-blue2 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-600"
                  >
                    <FaCog className="text-lg ml-2" />
                    <span className="ml-4 text-16">Quản Lý</span>
                  </Link>
                )}
              </MenuItem>

              {/* Các link cho mobile */}
              <>
                <MenuItem as="div">
                  <NavLinkMobile to="/" theme={theme}>
                    Blog
                  </NavLinkMobile>
                </MenuItem>
                <MenuItem as="div">
                  <NavLinkMobile to="/san_pham" theme={theme}>
                    Sản Phẩm
                  </NavLinkMobile>
                </MenuItem>
                <MenuItem as="div">
                  <NavLinkMobile to="/tuyen_dung" theme={theme}>
                    Tuyển dụng
                  </NavLinkMobile>
                </MenuItem>
                {isAdmin && (
                  <MenuItem as="div">
                    <NavLinkMobile to="/admin" theme={theme}>
                      Admin
                    </NavLinkMobile>
                  </MenuItem>
                )}
              </>
              <hr className="bg-black md:hidden" />
              <MenuItem as="div">
                <Link
                  to="/setting"
                  className="flex items-center space-x-6 px-6 py-3 text-black hover:bg-white-blue2 rounded-lg"
                >
                  <IoMdSettings className="text-16" />
                  <span>Settings</span>
                </Link>
              </MenuItem>
              <MenuItem as="div">
                <Link
                  to="/support"
                  className="flex items-center space-x-6 px-6 py-3 text-black hover:bg-white-blue2 rounded-lg"
                >
                  <MdSupportAgent className="text-16" />
                  <span>Đóng góp</span>
                </Link>
              </MenuItem>
              <hr className="bg-black" />
              <MenuItem as="div">
                {userInfo ? <LogoutButton /> : <LoginBtn />}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <hr />
    </div>
  );
};

export default Nav;

import { ImStatsBars } from "react-icons/im";

function Navbar() {
  return <div className="container max-w-2xl px-6 py-6 mx-auto">
    <div className="flex justify-between items-center">
      {/* User information */}
      <div className="flex items-center gap-2">
        {/* user profile image */}
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src="https://avatarfiles.alphacoders.com/125/125212.png" alt="person" />
        </div>

        {/* name */}
        <small>Hi, Ryan!</small>
      </div>

      {/* Right-side of our navigation */}
      <nav className="flex items-center gap-4">
        <div>
          <ImStatsBars className="text-2xl" />
        </div>
        <div><button className="btn btn-danger">Sign Out</button></div>
      </nav>
    </div>
  </div>
}

export default Navbar
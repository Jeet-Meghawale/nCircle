const Navbar = () => {
  return (
    <div className="h-16 bg-[#0B0F19] border-b border-gray-800 flex items-center justify-between px-6">
      
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-white font-semibold text-lg">Project Portal</h1>

        <nav className="flex gap-4 text-gray-400">
          <span className="text-green-500">Dashboard</span>
          <span>Projects</span>
          <span>My Projects</span>
          <span>Approvals</span>
          <span>Enrollment</span>
        </nav>
      </div>  

      {/* Right */}
      <div className="flex items-center gap-4">
        <span>🔔</span>

        <span className="bg-green-600 text-black px-3 py-1 rounded">
          Admin
        </span>

        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          JS
        </div>
      </div>
    </div>
  );
};

export default Navbar;
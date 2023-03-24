const Header = ({ children, title }) => {
  return (
    <div className="flex items-center justify-between h-20">
      <h1 className="text-3xl">{title}</h1>
      {children}
    </div>
  );
};

export default Header;

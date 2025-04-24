
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto py-2 px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9abbb152-9a04-4037-b3ac-fa142839c692.png" 
              alt="ВЫБОР+" 
              className="h-10 md:h-12" 
            />
            <span className="text-lg md:text-xl font-bold text-brand hidden sm:block">
              ВЫБОР+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand font-medium">
              Главная
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-brand font-medium">
              Каталог
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand font-medium">
              О компании
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-brand font-medium">
              Контакты
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                className="w-48 lg:w-64 rounded-md pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand hover:bg-brand text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form 
          onSubmit={handleSearch} 
          className={`mt-2 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full rounded-md pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 flex flex-col space-y-2 pb-2">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-brand font-medium px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className="text-gray-700 hover:text-brand font-medium px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-brand font-medium px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              О компании
            </Link>
            <Link 
              to="/contacts" 
              className="text-gray-700 hover:text-brand font-medium px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

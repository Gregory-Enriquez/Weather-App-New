interface SearchBarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    loading: boolean;
  }
  
  const SearchBar = ({ city, setCity, handleSearch, loading }: SearchBarProps) => {
    return (
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    );
  };
  
  export default SearchBar;
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ suggestions: [] });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Référence pour le dropdown

  // Fonction pour appeler l'API après un délai de saisie
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(async () => {
        await fetch(`http://139.99.61.232:8080/api/full/autocomplete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: searchTerm }),
          })
          .then((response) => response.json())
          .then((data) => {
            setSearchResults(data);
            setIsDropdownOpen(true); // Afficher le menu déroulant quand il y a des résultats
          });
      }, 500); // Délai de 500ms avant l'appel API

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults({ suggestions: [] });
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  // Effet pour gérer le clic à l'extérieur du dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Ferme le dropdown
        setSearchTerm(''); // Vider la barre de recherche
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>
  
      <div className="relative w-full max-w-md" ref={dropdownRef}>
        <input
          type="text"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <ul className="absolute z-10 left-0 right-0 bg-white text-black rounded shadow-lg mt-1">
            {searchResults.suggestions.length ? (
              searchResults.suggestions.map((result) => (
                <li key={result.value} className="hover:bg-gray-200 cursor-pointer">
                  <Link 
                    href={result.searchUrl} 
                    onClick={() => {
                      setIsDropdownOpen(false); // Ferme le dropdown
                      setSearchTerm(''); // Vider la barre de recherche
                    }} 
                    className="block px-4 py-2"
                  >
                    {result.value}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;

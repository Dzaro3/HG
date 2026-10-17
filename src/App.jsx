import { useState } from 'react';

export default function App() {
  // To jest nasz JavaScript (Mózg) - stan aplikacji
  const [data, setData] = useState("Brak pobranych danych");

  async function getData() {
    setData("Pobieram dane z serwera...");
    try{
      const answer = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const objectJson = await answer.json();
      setData(`Sukces! Pobrany tytuł: "${objectJson.title}"`);
    } catch (error) {
      setData("Błąd: nie udało się połączyć z serwerem.");
    }

  }

  async function sendData() {
    setData("Wysyłam dane na serwer...");
    try {
      const answer = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', // Zmieniamy metodę na wysyłanie
        headers: {
          'Content-Type': 'application/json', // Mówimy serwerowi, że wysyłamy JSON-a
        },
        body: JSON.stringify({
          title: 'Mój nowy wpis z labów',
          body: 'To jest treść wpisu wysłanego z Reacta.',
          userId: 1,
        }),
      });
      
      const objectJson = await answer.json();
      // Serwer JSONPlaceholder symuluje zapis i zwraca nam wygenerowane ID:
      setData(`Sukces! Utworzono wpis. Serwer nadał mu ID: ${objectJson.id}`);
    } catch (error) {
      setData("Błąd: nie udało się wysłać danych.");
    }
  }

  // To jest nasz HTML + CSS (Zwracany Interfejs)
  return (
    // Główny kontener na całą stronę (min-h-screen = minimum 100% wysokości ekranu)
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-cyan-100">
      
      {/* 1. HEADER (Nagłówek) */}
      <header className="bg-cyan-800 text-white p-4 text-2xl font-bold shadow-md">
        Nazwa strony
      </header>

      {/* 2. ŚRODEK STRONY (Grid, który dzieli to na 3 kolumny) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        
        {/* Lewa kolumna: NAV (Nawigacja) */}
        <nav className="bg-white p-4 rounded-lg shadow border border-gray-200 md:col-span-1">
          <h2 className="font-bold text-gray-500 mb-2 uppercase text-sm">Menu</h2>
          <ul>
            <li className="text-blue-600 font-semibold cursor-pointer mb-2">Dashboard</li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Ustawienia</li>
          </ul>
        </nav>

        {/* Środkowa kolumna: MAIN (Główna treść - 2x szersza) */}
        <main className="bg-white p-6 rounded-lg shadow border border-gray-200 md:col-span-2">
          <h1 className="text-2xl font-bold mb-4 border-b pb-2">Panel Główny</h1>
          <p className="mb-6 text-gray-600">
            Układ Holy Grail napisany bez ani jednego zewnętrznego pliku CSS.
            Wszystko znajduje się w jednym pliku komponentu React.
          </p>
          
          {/* Symulacja systemu (CRUD) */}
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Test Komunikacji</h3>
            <p className="font-mono text-sm text-blue-800 bg-white p-2 rounded mb-4 shadow-inner">
              Status: {data}
            </p>
            <button 
              onClick={getData}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors mr-2"
            >
              Wykonaj zapytanie (GET)
            </button>
  
            <button 
              onClick={sendData}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Wyślij nowe dane (POST)
            </button>
          </div>
        </main>

        {/* Prawa kolumna: ASIDE (Panel boczny) */}
        <aside className="bg-white p-4 rounded-lg shadow border border-gray-200 md:col-span-1">
          <h2 className="font-bold text-gray-500 mb-2 uppercase text-sm">Statystyki</h2>
          <div className="h-32 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
            Brak aktywnych użytkowników
          </div>
        </aside>

      </div>

      {/* 3. FOOTER (Stopka) */}
      <footer className="bg-gray-800 text-gray-200 p-4 text-center text-sm mt-auto">
        Semba Si 2026
      </footer>

    </div>
  );
}
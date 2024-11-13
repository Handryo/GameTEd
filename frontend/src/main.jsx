import React from 'react';
import ReactDOM from 'react-dom/client'; // Note a importação de 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importação do QueryClient e QueryClientProvider
import MainLayout from './components/MainLayout.jsx';
import DevLayout from './components/DevLayout.jsx';
import SignupPage from './interface/Registeruser/SignupPage.jsx';
import Home from './interface/Home/Home.jsx';
import RecuperaSenha from './interface/Recoverpassword/SenhaRecupera.jsx';
import Login from './interface/Login/Login.jsx';
import CadastraJogo from './interface/Registergame/CadastraJogo.jsx';
import Perfil from './interface/Myprofile/Perfil.jsx';
import DesenvolvedorHome from './interface/Devhome/DesenvolvedorHome.jsx';
import SalasDeTeste from './interface/SalasDeTeste.jsx';
import Biblioteca from './interface/Library/Biblioteca.jsx';
import MeusJogos from './interface/Devgames/MeusJogos.jsx';
import GamePage from './interface/GamePage/GamePage.jsx';

// Criação do QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/recupera", element: <RecuperaSenha /> },
      { path: "/login", element: <Login /> },
      { path: "/perfil", element: <Perfil /> },
    ],
  },
  {
    element: <DevLayout />,
    children: [
      { path: "/desenvolvedorhome", element: <DesenvolvedorHome /> },
      { path: "/salasdeteste", element: <SalasDeTeste /> },
      { path: "/biblioteca", element: <Biblioteca /> },
      { path: "/meusjogos", element: <MeusJogos /> },
      { path: "/cadastrajogo", element: <CadastraJogo /> },
      { path: "/game/:gameId", element: <GamePage /> }, // Corrigido para `<GamePage />`
    ],
  },
  { path: '*', element: <div>Erro: Página não encontrada</div> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Envolvendo RouterProvider com QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './routes/App';
import './index.css';

import { ProfView, loader as profsLoader} from './views/ProfView';
import { EleveView, loader as elevesLoader } from './views/EleveView';
import { ClasseView, loader as classesLoader } from './views/ClasseView';
import { MatiereView, loader as matieresLoader } from './views/MatiereView';
import { NoteView, loader as notesLoader } from './views/NoteView';

import RootLayout from './routes/RootLayout';

import NewEleve, { action as newEleveAction, loader as newEleveLoader } from './components/eleve/NewEleve';
import NewProf, { action as newProfAction, loader as newProfLoader } from './components/prof/NewProf';
import NewClasse, { action as newClasseAction, loader as newClasseLoader } from './components/classe/NewClasse';
import NewMatiere, { action as newMatiereAction} from './components/matiere/NewMatiere';
import NewNote, { action as newNoteAction, loader as newNoteLoader } from './components/note/NewNote';

import EditEleve, { loader as editEleveLoader, action as editEleveAction } from './components/eleve/EditEleve';
import EditProf, { loader as editProfLoader, action as editProfAction } from './components/prof/EditProf';
import EditClasse, { loader as editClasseLoader, action as editClasseAction } from './components/classe/EditClasse';
import EditMatiere, { loader as editMatiereLoader, action as editMatiereAction } from './components/matiere/EditMatiere';
import EditNote, { loader as editNoteLoader, action as editNoteAction } from './components/note/EditNote';

import PageNotFind from './components/PageNotFind';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
    { 
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        { path: '/', element: <App />},
        { 
          path: '/professeurs',
          element: <ProfView />,
          loader: profsLoader,
          children: [{ path: '/professeurs/create', element: <NewProf />, action: newProfAction, loader: newProfLoader },
                     { path: '/professeurs/:id', element: <EditProf />, action: editProfAction, loader: editProfLoader }]
        },
        { path: '/eleves',
          element: <EleveView />,
          loader: elevesLoader,
          children: [{ path: '/eleves/create', element: <NewEleve />, action: newEleveAction, loader: newEleveLoader },
                     { path: '/eleves/:id', element: <EditEleve />, loader: editEleveLoader, action: editEleveAction }]
        },
        { path: '/classes',
          element: <ClasseView />,
          loader: classesLoader,
          children: [{ path: '/classes/create', element: <NewClasse />, action: newClasseAction, loader: newClasseLoader },
                     { path: '/classes/:id', element: <EditClasse />, loader: editClasseLoader, action: editClasseAction }]
        },
        { path: '/matieres',
          element: <MatiereView />,
          loader: matieresLoader,
          children: [{ path: '/matieres/create', element: <NewMatiere />, action: newMatiereAction },
                     { path: '/matieres/:id', element: <EditMatiere />, loader: editMatiereLoader, action: editMatiereAction }]
        },
        { path: '/notes',
          element: <NoteView />,
          loader: notesLoader,
          children: [{ path: '/notes/create', element: <NewNote />, action: newNoteAction, loader: newNoteLoader },
                     { path: '/notes/:id', element: <EditNote />, loader: editNoteLoader, action: editNoteAction }]
        },
      ]
    },
    { path: '*', element: <PageNotFind /> }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
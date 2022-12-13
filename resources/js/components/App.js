import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter, HashRouter} from 'react-router-dom'
import Inscription from '../pages/register/Inscription'
import Layout from './Layout'
/* crm */
import CrmLayout from './CrmLayout'
import CrmHome from "./CrmHome";
import VoitureDetail from './VoitureDetail';
/* pour changement de langue */
import LangueWrapper from './LangueWrapper';
import '../../css/app.css';
import InscriptionClient from '../pages/register/InscriptionClient';
import ModificationClient from '../pages/register/ModificationClient';
import DetailClient from '../pages/register/DetailClient';
import ListeVoitures from "./ListeVoitures";
import Home from './Home';
import Connexion from "../pages/register/Connexion";
import ClientIndex from "../pages/client/ClientIndex";
import {AuthProvider, RequireAuth} from '../route/Auth.js'

function App() {
    return (
      <AuthProvider>
        <LangueWrapper>

            <Routes>
                <Route path="/app" element={<Layout/>}>

                    <Route path="/app/voiture/liste" element={<ListeVoitures/>}/>
                    <Route index element={<Home/>}/>
                    <Route path="/app/voiture/:id" element={<VoitureDetail/>}/>
                    <Route path="/app/connexion" element={<Connexion/>}/>
                    <Route path="/app/register" element={<Inscription/>}/>

                    <Route path="/app/inscription-client/:id" element={
                        <RequireAuth>
                            <InscriptionClient/>
                        </RequireAuth>
                    }/>
                    <Route path="/app/modifier-profil/:id" element={
                        <RequireAuth>
                            <ModificationClient/>
                        </RequireAuth>
                    }/>
                    <Route path="/app/detail-profil/:profil" element={
                        <RequireAuth>
                            <DetailClient/>
                        </RequireAuth>
                    }/>
                    <Route path="/app/client-index" element={
                        <RequireAuth>
                            <ClientIndex/>
                        </RequireAuth>
                    }/>
                    <Route path="/app/*" element={<Home/>}/>

                </Route>

                <Route path="/crm" element={<CrmLayout/>}>
                    <Route index element={<CrmHome/>}/>
                    <Route path="/crm/home" element={<CrmHome/>}/>
                    <Route path="/crm/*" element={<CrmHome/>}/>
                </Route>

            </Routes>

        </LangueWrapper>
      </AuthProvider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('app'));
}

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ScorePoints';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import StaffPage from './pages/StaffPage';
import ScorePoints from './pages/ScorePoints';
import Header from './components/Header';
import Footer from './components/Footer';
import CampsitesDirectoryPage from './pages/CampsitesDirectoryPage';
import DraftPage from './pages/DraftPage';
import StaffDetailPage from './pages/StaffDetailPage';
import TeamDirectoryPage from './pages/TeamDirectoryPage';
import TeamDetailPage from './pages/TeamDetailPage';
import { fetchCampsites } from './features/campsites/campsitesSlice';
import { fetchPartners } from './features/partners/partnersSlice';
import { fetchPromotions } from './features/promotions/promotionsSlice';
import { fetchComments } from './features/comments/commentsSlice';
import { fetchStats } from './features/stats/statsSlice';
import { fetchAirTableStaff, fetchStaff } from './features/staff/staffSlice';
import { fetchDraftRecap, fetchTeams ,fetchTeam1Air,fetchTeam2Air,fetchTeam3Air, draftTeam1, draftTeam2, draftTeam3, fetchAirTableTeams } from './app/teams/TeamSlice';
import { draftedTeams } from './app/teams/TeamSlice';
import DratedTeams from './app/teams/DratedTeamsList';
import './App.css';
import './components/style.css'



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAirTableStaff());
        dispatch(fetchAirTableTeams());
        dispatch(fetchStats());
        dispatch(fetchTeam1Air());
        dispatch(fetchTeam2Air());
        dispatch(fetchTeam3Air());
        dispatch(fetchDraftRecap());
     }, [dispatch]);
    
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='draft' element={<DraftPage />} />
                <Route path='staff' element={<StaffPage />} />
                <Route path='teams' element={<TeamDirectoryPage />} />
                <Route path='score' element={<ScorePoints />} />
                {/* <Route
                    path='draft/:staffId'
                    element={<StaffDetailPage />}
                /> */}
                <Route
                    path='staff/:staffId'
                    element={<StaffDetailPage />}
                />
                <Route
                    path='teams/:teamId'
                    element={<TeamDetailPage />}
                />
                <Route
                    path='teams/:teamId/:staffId'
                    element={<StaffDetailPage />}
                />
                <Route path='stats' element={<StatsPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
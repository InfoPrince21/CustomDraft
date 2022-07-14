import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CampsitesDirectoryPage from './pages/CampsitesDirectoryPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import StaffDetailPage from './pages/StaffDetailPage';
import TeamDirectoryPage from './pages/TeamDirectoryPage';
import TeamDetailPage from './pages/TeamDetailPage';
import { fetchCampsites } from './features/campsites/campsitesSlice';
import { fetchPartners } from './features/partners/partnersSlice';
import { fetchPromotions } from './features/promotions/promotionsSlice';
import { fetchComments } from './features/comments/commentsSlice';
import { fetchStaff } from './features/staff/staffSlice';
import { fetchDraftedPlayers, fetchTeams ,fetchTeam1,fetchTeam2,fetchTeam3, draftTeam1, draftTeam2, draftTeam3 } from './app/teams/TeamSlice';
import { draftedTeams } from './app/teams/TeamSlice';
import DratedTeams from './app/teams/DratedTeamsList';
import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPartners());
        dispatch(fetchPromotions());
        dispatch(fetchComments());
        dispatch(fetchStaff());
        dispatch(fetchTeams());
        dispatch(fetchTeam1());
        dispatch(fetchTeam2());
        dispatch(fetchTeam3());
        dispatch(fetchDraftedPlayers());
     }, [dispatch]);
    
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='directory' element={<CampsitesDirectoryPage />} />
                <Route path='staff-directory' element={<StaffDirectoryPage />} />
                <Route path='team-directory' element={<TeamDirectoryPage />} />
                <Route
                    path='staff-directory/:staffId'
                    element={<StaffDetailPage />}
                />
                <Route
                    path='team-directory/:teamId'
                    element={<TeamDetailPage />}
                />
                <Route
                    path='team-directory/:teamId/:staffId'
                    element={<StaffDetailPage />}
                />
                <Route path='about' element={<AboutPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
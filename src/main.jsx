import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AllCandidates from './Pages/Candidates/AllCandidates';
import Sections from './Pages/Sections/AllSections';
import AllElectoralCenters from './Pages/ElectoralCenter/AllElectoralCenters';
import AddElectoralHeadquarters from './Pages/Adds/AddElectoralHeadquarters';
import AddHeadquarters from './Pages/Adds/AddHeadquarters';
import Governorates from './Pages/Governorates/AllGovernorates';
import AddSection from './Pages/Adds/AddSection';
import ElectoralDistricts from './Pages/ElectoralDistricts/ElectoralDistricts';
import Councils from './Pages/Councils/Councils';
import Sidebar from './Components/Sidebar/Sidebar';
import Layout from './Layout/Layout';
import Login from './Pages/Login/Login';
import AddUsers from './Pages/AddUser/AddUsers';
import HomePage from './Pages/HomePage/HomePage';
import ProtectedRoute from './Components/Sidebar/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AddVoter from './Pages/Voter/AddVoter';
import AddElectoralDistricts from './Pages/ElectoralDistricts/AddElectoralDistricts';
import AddSections from './Pages/Sections/AddSections';
import AddVillage from './Pages/Village/AddVillage';
import AllVillage from './Pages/Village/AllVillage';
import AllCommittee from './Pages/Committee/AllCommittee';
import AddCommittee from './Pages/Committee/AddCommittee';
import AddElectoralCenters from './Pages/ElectoralCenter/AddElectoralCenters';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AllVoter from './Pages/Voter/AllVoter';

const root = document.getElementById('root');
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <Routes>
                    {/* Login route */}
                    <Route path="/" element={<Login />} />

                    {/* Protected routes */}
                    <Route
                        path="*"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Sidebar />
                                    <Routes>
                                        <Route path="/home" element={<HomePage />} />
                                        <Route path="/all-candidates" element={<AllCandidates />} />
                                        <Route
                                            path="/electoral-center"
                                            element={<AllElectoralCenters />}
                                        />
                                        <Route
                                            path="/add-electoral-center"
                                            element={<AddElectoralCenters />}
                                        />
                                        <Route path="/sections" element={<Sections />} />
                                        <Route
                                            path="/add-electoral-headquarters"
                                            element={<AddElectoralHeadquarters />}
                                        />
                                        <Route
                                            path="/add-headquarters"
                                            element={<AddHeadquarters />}
                                        />
                                        <Route path="/add-section" element={<AddSection />} />
                                        <Route path="/governorates" element={<Governorates />} />
                                        <Route path="/councils" element={<Councils />} />
                                        <Route path="/add-user" element={<AddUsers />} />
                                        <Route path="/add-sections" element={<AddSections />} />
                                        <Route path="/add-village" element={<AddVillage />} />
                                        <Route path="/village" element={<AllVillage />} />
                                        <Route path="/committee" element={<AllCommittee />} />
                                        <Route path="/add-committee" element={<AddCommittee />} />
                                        <Route path="/add-voter" element={<AddVoter />} />
                                        <Route path="/All-voters" element={<AllVoter />} />
                                        <Route
                                            path="/add-Electoraldistricts"
                                            element={<AddElectoralDistricts />}
                                        />
                                        <Route
                                            path="/electoral-districts"
                                            element={<ElectoralDistricts />}
                                        />
                                    </Routes>
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </HashRouter>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
    </Provider>
);

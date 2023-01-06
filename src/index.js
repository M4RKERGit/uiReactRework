import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from './components/IndexPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreliminaryPage from "./components/PreliminaryPage";
import POSReportsPage from "./components/POSReportsPage";
import RequestPage from "./components/RequestPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<IndexPage/>} />
            <Route path="/preliminary" element={<PreliminaryPage/>}/>
            <Route path="/posReports" element={<POSReportsPage/>}/>
            <Route path="/request/:id" element={<RequestPage/>}/>
        </Routes>
        <Footer />
    </Router>
);
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/slice/store";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout/Layout";
import Notes from "./components/pages/Notes";
import Reminders from "./components/pages/Reminders";
import EditLabels from "./components/pages/EditLabels";
import Archive from "./components/pages/Archive";
import Trash from "./components/pages/Trash";
// import Login from "./components/pages/Login";
import Header from "./components/Layout/Header";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/Header" element={<Header />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="notes" element={<Notes />} />
              <Route path="reminders" element={<Reminders />} />
              <Route path="edit-labels" element={<EditLabels />} />
              <Route path="archive" element={<Archive />} />
              <Route path="trash" element={<Trash />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

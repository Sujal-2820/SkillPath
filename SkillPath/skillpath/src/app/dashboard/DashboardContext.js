// app/dashboard/DashboardContext.js
import { createContext, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export default DashboardContext;

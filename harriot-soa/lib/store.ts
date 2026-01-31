import { create } from 'zustand';

interface AppState {
  revenue: number;
  occupancy: number;
  activeAgents: number;
  criticalAlerts: number;
  // Actions
  approveAction: (upliftAmount: number) => void;
  simulateLiveFeed: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  revenue: 142500,
  occupancy: 72.4,
  activeAgents: 18,
  criticalAlerts: 4,

  // Called when you click "Approve" in the Action Tracker
  approveAction: (upliftAmount) => set((state) => ({
    revenue: state.revenue + upliftAmount,
    occupancy: Math.min(100, state.occupancy + (upliftAmount / 5000)), // Slight bump in occupancy
    activeAgents: state.activeAgents + 1,
    criticalAlerts: Math.max(0, state.criticalAlerts - 1)
  })),

  // The Heartbeat: Simulates live websocket data
  simulateLiveFeed: () => set((state) => {
    // Random micro-fluctuations
    const revFlux = Math.random() > 0.5 ? Math.random() * 150 : -Math.random() * 50; 
    const occFlux = Math.random() > 0.5 ? 0.1 : -0.05;

    return {
      revenue: state.revenue + revFlux,
      occupancy: Math.min(100, Math.max(0, state.occupancy + occFlux))
    };
  }),
}));
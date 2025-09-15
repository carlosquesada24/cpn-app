"use client"

import React, { createContext, useContext, useEffect } from 'react';
import { useInventory } from '../hooks/useInventory';

interface GlobalContextData {
  inventory: {
     productsList: any[],
    productsTableFormatted: any[],
    rows: any[],
    setRows: Function,
  };
//   countProductsList: any[];

  // Add other actions as needed
  // Count product: countProduct()
  //   addRoutine: (routine: Routine) => void;
  //   addWorkoutSession: (newRoutinesList: Routine[]) => void;
}

// Create the context
export const GlobalContext = createContext<GlobalContextData>({
  inventory: {
    productsList: [],
    productsTableFormatted: [],
    rows: [],
    setRows: () => {},
  },
    // countProductsList: []
});

// Create a provider component
export const GlobalProvider: React.FC<{ children: any }> = ({ children }) => {
//   const [productsList, setProductsList] = useState<any[]>([]);
//   const [countProductsList, setCountProductsList] = useState<any[]>([]);

  const { productsList, productsTableFormatted, rows, setRows } = useInventory()

  useEffect(() => {
    
  }, []);

  const inventory = {
    productsList,
    productsTableFormatted,
    rows,
    setRows,
    // countProducts
    // etc
    // Pending to change the name
    productsToShowOnTable: []
  }

  const orders = {
    // ordersList
  }

  return (
    <GlobalContext.Provider value={{
      inventory,
    //   countProductsList
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the RoutinesContext
export const useGlobal = (): GlobalContextData => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useRoutines must be used within a RoutinesProvider');
  }
  return context;
};
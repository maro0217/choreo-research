import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";
import { Article } from "src/types/article";

export const SearchContext = createContext<{
    search: Article[];
    select: Article[];
  }>({
      search: [],
      select: [],
  });
  
export const SearchDispatchContext = createContext<{
    setSearch: Dispatch<SetStateAction<Article[]>>;
    setSelect: Dispatch<SetStateAction<Article[]>>;
  }>({
    setSearch: () => {
        throw Error("No default value!");
    },
    setSelect: () => {
    throw Error("No default value!");
    }
  });
  
  
export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<Article[]>([]);
    const [select, setSelect] = useState<Article[]>([]);
    
    return (
        <SearchContext.Provider value={{ search, select }}>
            <SearchDispatchContext.Provider value={{ setSearch, setSelect }}>
                {children}
            </SearchDispatchContext.Provider>
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext);
  };
  
  export const useSearchDispatch = () => {
    return useContext(SearchDispatchContext);
  };
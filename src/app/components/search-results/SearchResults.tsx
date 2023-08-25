import React from "react";
import SearchCard from "../search-card/SearchCard";
import styles from "./SearchResults.module.scss";

export interface SearchResult {
  skillName: string;
  skillLevel: number;
  lastUsed: string;
  comment: string;
  userName: string;
  userTitle: string;
  userPFP: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Response {
  category: Category;
  results: SearchResult[];
}

export interface SearchResultsProps {
  [x: string]: any;
  data: Response[];
}

const SearchResults = ({ data }: SearchResultsProps) => {
  return (
    <div>
      {data.map((i, index) => (
        <div key={index}>
          <h2>{i.category.name}</h2>
          {i.results.map((r, resultIndex) => (
            <SearchCard
              key={`result.${index}.${resultIndex}`}
              skillName={r.skillName}
              skillLevel={r.skillLevel}
              lastUsed={r.lastUsed}
              comment={r.comment}
              userName={r.userName}
              userTitle={r.userTitle}
              userPFP={r.userPFP}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

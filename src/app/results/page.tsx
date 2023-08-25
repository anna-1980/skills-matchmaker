"use client";
import SearchResults, {
  SearchResultsProps,
  SearchResult,
} from "../components/search-results/SearchResults";
import styles from "./page.module.scss";
import Image from "next/image";
import { use } from "react";
import { useSearchParams } from "next/navigation";

async function search(query: string | null): Promise<SearchResultsProps> {
  const res = await fetch(
    `http://37.114.34.4:5000/api/Search?searchString=${query}`
  );
  return res.json();
}

export default function Results() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  let data = use(search(searchQuery));

  let count = data.map((i: { results: SearchResult[] }) => {
    return i.results.length;
  });

  let total = 0;
  for (let i = 0; i < count.length; i++) {
    total += count[i];
  }

  return (
    <main>
      {data != null && Object.keys(data).length != 0 ? (
        <>
          <h1>
            {total} {total > 1 ? "results" : "result"} found!
          </h1>
          <hr />
          <SearchResults data={data} />
        </>
      ) : (
        <>
          <h1>No one is found!</h1>
          <hr />
          <Image
            className={styles.noResultsImage}
            src="./no-results.svg"
            alt="No one is found!"
            width={500}
            height={500}
          />
        </>
      )}
    </main>
  );
}

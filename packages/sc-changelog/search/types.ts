import { ChangelogEntry } from "../types/changeLogEntry";

export type QuerySearchApiParams = {
  query: string;
  selectedFacets: ChangeLogSearchFacet[];
}

export type QuerySearchApiResult = {
  entries: ChangelogEntry[];
  facets: ChangeLogSearchFacet[];
  isMore: boolean;
}

export type SearchChangeLogQueryParams = {
  path: string;
  limit?: number;
  offset?: number;
  uuid?: string;
  facets: ChangeLogSearchFacet[];
}

export type ChangeLogSearchFacetValue = {
  id: string;
  text: string;
  count: number;
  selected: boolean;
}

export type ChangeLogSearchFacet = {
  name: string;
  label: string;
  value: ChangeLogSearchFacetValue[];
}
export type AppResponse = {
  extensions: Extensions;
  data: TObject;
};

type Extensions = {
  pagination: Pagination;
}

type Pagination = {
  page: number;
  perPage: number;
}

interface TObject {
  [key: string]: any;
}
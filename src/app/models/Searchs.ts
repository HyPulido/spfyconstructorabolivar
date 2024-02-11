export interface SearchResponseModel {
    albums?: AlbumsItemsModel;
    artists?: ArtistsItemsModel;
    tracks?: TracksItemsModel;
}

export interface AlbumsItemsModel {
  items: AlbumsModel[];
}

export interface AlbumsModel {
  id: number;
  name: string;
  images: [{url:string}]
}

export interface ArtistsItemsModel {
  items: ArtistsModel[];
}

export interface ArtistsModel {
  id: number;
  name: string;
  images: [{url:string}]
}

export interface TracksItemsModel {
  items: TracksModel[];
}

export interface TracksModel {
  id: number;
  name: string;
}
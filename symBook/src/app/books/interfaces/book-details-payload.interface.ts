export interface BookDetailsPayload {
    data: BookDetailsData;
}

export interface BookDetailsData {
    attributes: BookDetailsAttributes;
}

export interface BookDetailsAttributes {
    group: BookGroupItem[];
}

export interface BookGroupItem {
    title: string;
    bookList: BookListItem[];
}

export interface BookListItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    author: string;
    date: Date;
}
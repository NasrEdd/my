export interface GridConfiguration<T> {
    primaryKey : string;
    height ?:number;
    columns: any[];
    transactions ?:any[],
    apiSet: { 
        create :string,
        update :string,
        delete :string
    },
    data :T[];
    edittedHandler :(newData :T[])=>any;
    creatHandler :(newData :T[])=>any;
    deleteHandler :(newData :T[])=>any;
}
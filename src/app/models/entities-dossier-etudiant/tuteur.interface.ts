export interface Tuteur {

    Ttr_Id :string;
    Etd_Id ?:string;
    LienTtrEtd_Id ?:string;
    Pers_Nom ?:string;
    Pers_Prenom ?:string;
    Sex_Id ?:string;
    Pers_CinouPass ?:string;
    Crd_AdessCouriel1 ?:string;
    Crd_AdrLigne1 ?:string;
    Crd_Cell1 ?:number;
    
    Crd_Cell2 ?:number;
    Crd_TelFixe1 ?:number;
    Crd_TelFixe2 ?:number;
    Ttr_Profession ?:string;
    FonctionEnum_Id ?:string;
    Pers_DateNaissance ?:string;
    Crd_Pays ?:string;
    Crd_Ville ?:string;
    Pers_Id ?:string;
    Crd_Id ?:string;
    PersTyp_Id ?:string;
    Nation_Id ?:string;
    SecteurEnum_Id ?:string;
    EntrepEnum_Id ?:string;
    Ses_Id ?:string;
    SesUserName ?:string;

}
interface DocDemande{
    DocDemande_ID :string,
    Etd_ID ?:string,
    Dem_Date ?:string,
    DocEtatDemande_Id ?:string,
    FAC_ID ?:string,
    DocDemande_Num ?:string
}

interface DocTypeDemande{
    DocTypDem_ID :string
    DocDemande_ID ?:string
    DocTyp_Id ?:string
}

export interface DocAdminisType {
    DocTypDem_ID: string,
    DocDemande_ID ?:string,
    Dem_Date ?:string,
    Pers_Prenom ?:string,
    Etd_Matricule ?:string,
    Pers_Nom ?:string,
    DocEtatDemande_Nom ?:string,
    Etd_ID ?:string,
    DocTyp_Id ?:string,
    DocTyp_Nom ?:string,
    DocDemande_Num ?:string,
    Fac_Nom ?:string,
    INS_DocDemande ?:DocDemande,
    INS_DocTypeDemande ?:DocTypeDemande[]
}
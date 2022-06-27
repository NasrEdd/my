export interface Association {
    EtdSpecSms_Id :string;
    Spec_Id ?:string;
    Spec_Name ?:string;
    Niv_Id ?:string;
    Niv_Nom ?:string;
    Sms_Nom ?:string;
    Ann_Id ?:string;
    Ann_Nom ?:string;
    Sess_Nom ?:string;
    AdmPrg_Code ?:string;
    AdmPrg_Nom ?:string;
    Fac_Nom ?:string;
    Prg_Code ?:string;
    Prg_Nom ?:string;
    ProgEtdStatu_Nom ?:string|null;
    EtdPrg_Id ?:string;
    EtdSpecSms_Moyenne ?:number|null;
    EtdSpecSms_Remarque ?:string|null;
    EtdSpecSms_Validation ?:boolean|null;
    ProgEtdStatu_Id ?:string|null;
    SpecSmsSess_Id ?:string;
    Etd_Matricule ?:string;
    Pers_Nom ?:string;
    Pers_Prenom ?:string;
    GrpSpecSmsSess_Id ?:string;
}
export interface SubSemestreData {
    Prg_Code ?:string;
    Prg_Nom ?:string;
    Spec_Name ?:string;
    Sms_Nom ?:string;
    Sess_Nom ?:string;
    EtdSpecSms_Moyenne ?:number|null;
    EtdSpecSms_Validation ?:boolean|null;

    Niv_Nom ?:string;
    Ann_Nom ?:string;
    Fac_Nom ?:string;
    Sess_Id ?:string;
    SpecSmsSess_Id ?:string;
    SpecSms_Id ?:string;
    Fac_Id ?:string;
    Ann_Id ?:string;
    EtdPrg_Id ?:string;
    ProgEtdStatu_Id ?:string;
    ProgEtdStatu_Nom ?:string;
}
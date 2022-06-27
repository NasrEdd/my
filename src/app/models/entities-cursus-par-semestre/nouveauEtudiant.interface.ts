import  { Semestre } from './semestre.interface';


export interface NouveauEtudiant {
    EtdPrg_Id  :string;
    Etd_Matricule ?:string;
    Pers_Nom ?:string;
    Pers_Prenom ?:string;
    Fac_Id  ?:string;
    Fac_Nom  ?:string;
    Prg_Code  ?:string;
    Prg_Nom  ?:string;
    AdmTyp_Id  ?:string;
    EtdPrg_DateAdmmission  ?:string;
    EtdPrg_DateInscription  ?:string;
    GrpAdm_Id  ?:string;
    PrgTyp_Id  ?:string;
    Niv_Id  ?:string;
    Spec_Name  ?:string;
    Ann_Id  ?:string;
    EtdPrg_Remarque  ?:string|null;
    ProgEtdStatu_Id  ?:string|null;
    Etd_Id  ?:string;
    Prg_Id  ?:string;
    EtdPrg_NumInscription  ?:string;
    Spec_Id  ?:string;
    ProgEtdStatu_Nom ?:string|null;
    Semestres: Semestre[]|null
}
import { Transaction } from "igniteui-angular";
import { Formation as FormationType } from "./formation.interface";
import { Moyenrecrutem as MoyenrecrutemType } from "./moyenrecrutem.interface";
import { Program as ProgramType } from "./program.interface";
import { Tuteur as TuteurType } from "./tuteur.interface";

export interface Etudiant {

    Crd_Id ?:string;
    Etd_Id : string; //ID

    Pers_Id ?:string;
    PersTyp_Id ?:string;
    PersRecrut_Id ?:string;

    Sexe_Id ?:string;
    Sexe_Nom ?:string;
    Pays_Id ?:string;
    Pays_Nom ?:string;
    Etd_Matricule ?:string;
    Pers_Nom : string;
    Pers_Prenom :string;
    Pers_CinouPass : string;
    Nation_Id ?: string;


    Pers_DateNaissance ?: string;
    Crd_LieuDeNaissance ?: string;

    Pers_Remarque ?:string;
    Pers_Photo ?: string;

    Crd_AdrLigne1 ?:string;
    Crd_AdrLigne2 ?:string;
    Crd_CodePostal ?:number;
    Crd_Ville ?:string;
    Crd_TelFixe1 ?:number;
    Crd_Cell1 ?:number;
    Crd_TelFixe2 ?:number;
    Crd_Cell2 ?:number;

    Crd_AdessCouriel1 ?:string;
    Crd_AdessCouriel2 ?:string;

    Ttr1_Id ?:string;
    Ttr2_Id ?:string;
    Crd_Compliement ?:string;
    LienTtr1Etd_Id ?:string;
    LienTtr2Etd_Id ?:string;

    Ses_Id ?:string;
    SesUserName ?:string;

    ACD_EtudiantFormation ?:FormationType[];
    ACD_EtudiantProgramme ?:ProgramType[];
    ACD_EtudiantTuteur ?:TuteurType[];
    ACD_EtudiantMoyenrecrutem ?:MoyenrecrutemType[];
    INS_Demande ?:any[];

    programTransactions ?:Transaction[];
    formationTransactions ?:Transaction[];
    tuteurTransactions ?:Transaction[];
    moyenrecrutTransactions ?:Transaction[];


    Fac_Id ?:string;
    Prg_Code ?:string;

}
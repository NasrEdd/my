import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImporterFicheComponent } from 'src/app/pages/importer-fiche/importer-fiche.component';
import { SmartPlaningComponent } from 'src/app/pages/smart-planing/smart-planing.component';
import { LeavingConfirmationGuard } from 'src/app/guards/leaving-confirmation/leaving-confirmation.guard';
import { CursusParNiveauComponent } from '../../pages/cursus-par-niveau/cursus-par-niveau.component';
import { CursusParSemestreComponent } from '../../pages/cursus-par-semestre/cursus-par-semestre.component';
import { DiplomesComponent } from '../../pages/diplomes/diplomes.component';
import { DocumentsAdministratifsComponent } from '../../pages/documents-administratifs/documents-administratifs.component';
import { DossierEtudiantComponent } from '../../pages/dossier-etudiant/dossier-etudiant.component';
import { EvaluerEmploitComponent } from 'src/app/pages/evaluer-emploit/evaluer-emploit.component';
import { PreTraitementComponent } from 'src/app/pages/pre-traitement/pre-traitement.component';
import { TableErreurComponent } from 'src/app/components/table-erreur/table-erreur.component';
import { ResumerComponent } from 'src/app/pages/resumer/resumer.component';
import { LancementAlgoComponent } from 'src/app/pages/lancement-algo/lancement-algo.component';
import { ResultatComponent } from 'src/app/resultat/resultat.component';
import { WaiterComponent } from 'src/app/pages/waiter/waiter.component';
import { PlchoixComponent } from 'src/app/plchoix/plchoix.component'
import { DetailsComponent } from 'src/app/pages/details/details.component';





const routes: Routes = [
  { path: '', redirectTo: 'dossier-etudiant', pathMatch: 'full', canDeactivate: [ LeavingConfirmationGuard ] },
  { path: 'dossier-etudiant', component: DossierEtudiantComponent, canDeactivate: [ LeavingConfirmationGuard ] },
  { path: 'cursus-par-semestre', component: CursusParSemestreComponent, canDeactivate: [ LeavingConfirmationGuard ] },
  { path: 'cursus-par-niveau', component: CursusParNiveauComponent },
  { path: 'documents-administratifs', component: DocumentsAdministratifsComponent },
  { path: 'diplomes', component: DiplomesComponent },
  { path: 'smart-planing', component: SmartPlaningComponent },
  { path: 'smart-planing/importer', component: ImporterFicheComponent },
  { path: 'smart-planing/evaluer', component: EvaluerEmploitComponent },
  { path: 'smart-planing/importer/Waiter', component: WaiterComponent },
  { path: 'smart-planing/importer/PreTraitement', component: PreTraitementComponent },
  { path: 'smart-planing/importer/PreTraitement/Resultat', component: TableErreurComponent },
  { path: 'smart-planing/importer/PreTraitement/Details', component: TableErreurComponent },
  { path: 'smart-planing/importer/PreTraitement/Lancement', component: LancementAlgoComponent }, 
  { path: 'smart-planing/importer/PreTraitement/Lancement/Resultat', component: ResultatComponent },
  { path: 'smart-planing/importer/PreTraitement/Lancement/Resultat/Details', component: DetailsComponent },
  { path: 'smart-planing/importer/PreTraitement/Lancement/Resultat/Details/PlanificationCh', component: PlchoixComponent },





  
];

@NgModule({
  providers: [ LeavingConfirmationGuard  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultLayoutRoutingModule { }

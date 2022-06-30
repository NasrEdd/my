// IgxExcelExporterService no longer need to be manually provided and can be safely removed.
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { DefaultLayoutComponent } from './default-layout.component';
import { SettingsMenuSideBarComponent } from '../../components/settings-menu-side-bar/settings-menu-side-bar.component';
import { ModulesMenuSideBarComponent } from '../../components/modules-menu-side-bar/modules-menu-side-bar.component';
import { DossierEtudiantComponent } from '../../pages/dossier-etudiant/dossier-etudiant.component';
import { CursusParSemestreComponent } from '../../pages/cursus-par-semestre/cursus-par-semestre.component';
import { CursusParNiveauComponent } from '../../pages/cursus-par-niveau/cursus-par-niveau.component';
import { DocumentsAdministratifsComponent } from '../../pages/documents-administratifs/documents-administratifs.component';
import { DiplomesComponent } from '../../pages/diplomes/diplomes.component';
import { GridTransactionsComponent } from 'src/app/components/grid-transactions.component';
import { SmartPlaningComponent } from 'src/app/pages/smart-planing/smart-planing.component';
import { ChoseComponent } from 'src/app/components/chose/chose.component';
import { ImporterFicheComponent } from 'src/app/pages/importer-fiche/importer-fiche.component';
import { EvaluerEmploitComponent } from 'src/app/pages/evaluer-emploit/evaluer-emploit.component';
import { ProgressBarreComponent } from 'src/app/components/progress-barre/progress-barre.component'

import { TableErreurComponent } from 'src/app/components/table-erreur/table-erreur.component';


// Here we import the IgxGridModule, so we can use the igxGrid!
import { IgxGridModule, IgxHierarchicalGridModule, IgxSplitterModule, IgxTooltipModule, IgxInputGroupModule } from 'igniteui-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthOverlayComponent } from 'src/app/components/auth-overlay/auth-overlay.component';
import { MenuFlottantComponent } from 'src/app/components/menu-flottant/menu-flottant.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ModeAssociationComponent } from 'src/app/pages/cursus-par-semestre/mode-association/mode-association.component';
import { ProgramSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/program-section/program-section.component';
import { FormationSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/formation-section/formation-section.component';
import { TuteurSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/tuteur-section/tuteur-section.component';
import { MoyenrecutemSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/moyenrecutem-section/moyenrecutem-section.component';
import { SemesterSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/semester-section/semester-section.component';
import { NotesSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/notes-section/notes-section.component';
import { BibliothequeSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/bibliotheque-section/bibliotheque-section.component';
import { PaiementSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/paiement-section/paiement-section.component';
import { AbsenceSectionComponent } from 'src/app/pages/dossier-etudiant/grid-sections/absence-section/absence-section.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from '../../Classes/custom-route-reuse-strategy';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    SettingsMenuSideBarComponent,
    ModulesMenuSideBarComponent,
    DossierEtudiantComponent,
    CursusParSemestreComponent,
    CursusParNiveauComponent,
    DocumentsAdministratifsComponent,
    DiplomesComponent,
    GridTransactionsComponent,
    AuthOverlayComponent,
    MenuFlottantComponent,
    LoaderComponent,
    ModeAssociationComponent,
    ProgramSectionComponent,
    FormationSectionComponent,
    TuteurSectionComponent,
    MoyenrecutemSectionComponent,
    SemesterSectionComponent,
    NotesSectionComponent,
    BibliothequeSectionComponent,
    PaiementSectionComponent,
    AbsenceSectionComponent,
    SmartPlaningComponent,
    ChoseComponent,
    ImporterFicheComponent,
    EvaluerEmploitComponent,
    TableErreurComponent,
    ProgressBarreComponent,

  ],
  imports: [
    CommonModule,
    DefaultLayoutRoutingModule,
    IgxGridModule,
    IgxHierarchicalGridModule,
    IgxSplitterModule,
    IgxTooltipModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    IgxInputGroupModule
  ],
  providers: [
    /* // sticky routes feature, to save routes states
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }
    */
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class DefaultLayoutModule { }

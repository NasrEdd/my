import { Component, OnInit } from '@angular/core';
import { IButtonGroupEventArgs } from 'igniteui-angular';
import { SmartPlaningComponent } from '../pages/smart-planing/smart-planing.component';
import { LoaderService } from 'src/app/services/loader-service/loader-service.service';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { thisQuarter } from '@igniteui/material-icons-extended';
import { Console } from 'console';

declare var $: any;

@Component({
  selector: 'app-planification-page',
  templateUrl: './planification-page.component.html',
  styleUrls: ['./planification-page.component.scss']
})
export class PlanificationPageComponent implements OnInit {
  counter: number = 5;



  StepperConfig: { PageTitle: string, StepTitle: string, isValide: boolean, isComplete: boolean }[] =
    [
      { PageTitle: "", StepTitle: "Smart-Planing", isValide: true, isComplete: false },
      { PageTitle: "Importation des fichiers EXCEL", StepTitle: "Importation", isValide: false, isComplete: false },
      { PageTitle: "Resultat Pre-Traitement", StepTitle: "PréTraitement", isValide: false, isComplete: false },
      { PageTitle: "Lancement de l'algorithme", StepTitle: "Lancement", isValide: false, isComplete: false },
      { PageTitle: "Meilleurs planifications", StepTitle: "Planifications", isValide: false, isComplete: false },
    ]


  ComingDataPreTrai: any = {
    "E_Groupe": 2,
    "E_duree": 0,
    "E_intrv": 0,
    "E_nbEtud": 3,
    "E_nbSea": 0,
    "HorsDisp": 0,
    "NonSaisieDisp": 3,
    "SecNonPlanif": 2
  };

  ComingDataResumerPre : any = {
    "generations_souhaites": 4,
    "nb_SeaNonPlanif": 2,
    "nb_salles": 40,
    "nombre_groupes": 41,
    "nombre_intervenants": 65,
    "sections_planifiees": 308
  }


  PageData: any[] = [
    {
      Title: ["Génération", "Evaluation"],
      descriptions: ["Pour générer un emploi du temps", "Pour évaluer l'emploi du temps"],
    },
    {
      url: "https://smartplanning-backend.herokuapp.com",
      Numberfile: 0,
      urlGeneration: "https://smartplanning-backend.herokuapp.com/Generation",
      username: "nasr",
    },
    {
      data: [{
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Erreur de groupe",
        erreur: 0,
        buttonID: "ErreurG",
        type: true,
        id: "El1",
      },
      {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Erreur de la durée",
        erreur: 1,
        buttonID: "ErreurD",
        type: true,
        id: "El3",

      },
      {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Erreur d'intervenant",
        erreur: 1,
        buttonID: "ErreurI",
        type: true,
        id: "El2",

      }, {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Erreur de Nombre d'etudiants",
        erreur: 1,
        buttonID: "ErreurE",
        type: true,
        id: "El4",

      }, {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Erreur de nombre de séances",
        erreur: 1,
        buttonID: "ErreurS",
        type: false,
        id: "ElI1",

      }, {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Hors disponibilités",
        erreur: 1,
        buttonID: "ErreurH",
        type: false,
        id: "ElI2",

      }, {
        description: "Des séances qui ont le champs de la durée vide ou non numérique ou incorrecte",
        title: "Non saisie disiponibilités",
        erreur: 1,
        buttonID: "ErreurNS",
        type: false,
        id: "ElI3",

      }, {
        description: "Des informations sur l'erreur apprevue du traitement",
        title: "Seances non planifiables",
        erreur: 1,
        buttonID: "ErreurSN",
        type: false,
        id: "ElI4",

      },
      ]
    },
    {
      data: [{
        title: "Nombre d'intervenants",
        erreur: "3",
        buttonID: "detail1",
        id: "A"
      },
      {
        title: "Nombre de seances planifiables",
        erreur: "1",
        buttonID: "detail1",
        id: "A"
      }, {
        title: "Nombre de salles",
        erreur: "5",
        buttonID: "detail1",
        id: "A"
      }, {
        title: "Nombre de groupes",
        erreur: "5",
        buttonID: "detail1",
        id: "A"
      }, {
        title: "nombre de seances non planifiables",
        erreur: "5",
        buttonID: "detail1",
        id: "A"
      }],
    },
    {
      TempsEstimer: 0,
      MilleuPlan: 0,
      Erreur: [{
        Err: "1",
        id: 1,
      },
      {
        Err: "2",
        id: 2,
      },
      {
        Err: "3",
        id: 3,
      },
      {
        Err: "4",
        id: 4,
      }],
    },

  ]

  key: any = [];
  value: any = [];

  data: any = [];
  TitreTableau: string = "Tableau";

  TempsEstimer: number = 4;
  MilleuPlan: number = 5;
  erreur: any = [{
    Err: "1",
    id: 1,
  },
  {
    Err: "2",
    id: 2,
  },
  {
    Err: "3",
    id: 3,
  },
  {
    Err: "4",
    id: 4,
  }]



  constructor(private http: HttpClient, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.PageData[1].NumberFile = 0;
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover({
        trigger: 'hover',
      });
    });


    /////////////////////////Tableau des erreur///////////////////////////



  }

  ngOnDestroy(): void {

  }


  public linear = false;
  public validate = false;
  waiter: number = 4;



  CreatTable(choix: string, Title: string) {

    this.data.forEach((element: any) => {
      this.key = Object.keys(element);
      this.value.push(Object.values(element));
    });
    $(function () {
      $("#dialog").dialog({
        autoOpen: false,
        width: window.innerWidth * 1,
        height: window.innerHeight * 1,
        show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "none",
          duration: 1000
        }
      });

      $("#" + choix).on("click", function () {
        $("#dialog").dialog("open");

      });
    });



  };





  checked(id: string) {
    this.PageData[1].NumberFile += 1;
    $(document).ready(function () {
      let element = $("#" + id).parent().parent().parent();
      console.log(element)
      let img = element.children()[1];
      $("#" + img.id).show(500);
      console.log(img.id)
      element.css({
        color: "white",
        transform: "scale(1.1)",
        border: "2px solid white",
        filter: "brightness(120%)"
      });
    });

  }


  getFile(event: any, nom: string) {

    switch (nom) {
      case "SP":

        const formDataSP = new FormData();
        formDataSP.append("file_sections", event.target.files[0]);
        this.http.post("https://smartplanning-backend.herokuapp.com/Generation" + "/UploadSections/" + "nasr", formDataSP)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);
            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;
      case "TD":

        const formDataTD = new FormData();
        formDataTD.append("file_disponibililtes", event.target.files[0]);
        this.http.post("https://smartplanning-backend.herokuapp.com" + "/UploadDisponibilites/" + "nasr", formDataTD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;
      case "PD":



        const formDataPD = new FormData();
        formDataPD.append("file_preferences", event.target.files[0]);
        this.http.post("https://smartplanning-backend.herokuapp.com" + "/UploadPreferences/" + "nasr", formDataPD)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })

        break;
      case "TS":
        const formDataTS = new FormData();
        formDataTS.append("file_salles", event.target.files[0]);
        this.http.post("https://smartplanning-backend.herokuapp.com" + "/UploadSalles/" + "nasr", formDataTS)
          .subscribe(
            (response: any) => {
              console.log("Response: ", response);

            },
            (error) => {
              console.error("Erreur: ", error)
            })
        break;

    };
    this.checked(nom);
  }

  AffecterData() {
    for (let i = 0; i < this.PageData[2].ComingData.length; i++) {
      this.PageData[2].data[i].erreur = this.PageData[2].ComingData[i];
      console.log(this.PageData[2].data[i].erreur)
    }
  }

  LancerPreTraitement(stepper: any) {
    let sub = this.http.post("https://smartplanning-backend.herokuapp.com/Generation" + "/LancementPretraitement/" + "nasr", null)
      .subscribe(
        (response: any) => {

          console.log("Response: ", response);
          this.ResultatPreTraitement(stepper);
        },
        (error) => {
          console.error("Erreur: ", error)
        })
  }
  checkPreTraitement(stepper: any) {
    this.http.post("https://smartplanning-backend.herokuapp.com/Generation" + "/LancementPretraitement/" + "nasr", null)
      .subscribe(
        (response: any) => {
          console.log("Response de Check: ", response);
          if (response.is_Start) {
            this.ResultatPreTraitement(stepper);
          }
        })

  }


  ArreterPreTraitement() {
    this.http.post("https://smartplanning-backend.herokuapp.com" + "/ArretPreTraitement/" + "nasr", null)
      .subscribe(
        (response: any) => {
          this.counter = 0;
          console.log("Response: ", response);

        },
        (error) => {
          this.counter = 0;

          console.error("Erreur: ", error)
        })


  }

  ResultatPreTraitement(stepper: any) {

    this.http.post("https://smartplanning-backend.herokuapp.com/Generation" + "/ResultatsPretraitement/" + "nasr", null)
      .subscribe(
        (res: any) => {
          console.log("response")
          console.log(res);
          if (res.is_InProgress) {
            if (this.counter <= 2)
              this.counter += 2;
            setTimeout(() => this.ResultatPreTraitement(stepper), 2000)
          } else {
            this.ComingDataPreTrai = res;
            stepper.next();
          }
        },
        (error: any) => {

          console.log("error : ", error)

        }

      )

  }

  login(stepper: any) {

    const headers = { "Content-Type": "application/json" }
    this.http.post<any>("https://smartplanning-backend.herokuapp.com" + "/Username", { "user": "nasr" }, { headers })
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status == 400 || res.status == 500) {
            window.location.reload();
          }

          if (res.Creation) {
            stepper.next();

          }
        },
        (error) => {
          console.error(error);
        }
      );

  }

  IsValideImportation() {
    if (this.PageData[1].NumberFile >= 2) {
      this.PageData[1].Validate = false;
      this.PageData[1].Complete = true;
      return true;
    }
    else
      this.PageData[1].Validate = false;
    return false
  }



  IsValidePreTraitement() {
    if (this.PageData[1].Complete == true) {
      this.PageData[1].Validate = false
      this.PageData[2].Complete = true;

      return false;
    }
    return true;
  }


  IsValideLancement() {
    this.PageData[3].Complete = true;
  }

  Lancer(stepper: any) {
    this.showLoaderImportation(stepper);
    this.counter = 5;
  }


  showLoaderLancement(stepper: any) {
    $(".fin").hide();
    $("#Titre2Hide").hide(500);
    $("#btnLancer").hide(100);
    $("#rootLancer").hide(2000);
    $(".case").show(2000);

    let intervalId = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(intervalId);
        setTimeout(() => {
          stepper.next();
          $("#Titre2Hide").show();
          $("#btnLancer").show();
          $("#rootLancer").show();
          $(".case").hide();

        }, this.waiter);

        $('.classic-1').hide(1000);
        $('.info').css({
          "filter": "brightness(120%)",
          'color': "white"
        });
        $('.fin').show(1000);
      }
    }, 1000);
  }


  AfficheVisualise(element: any) {
    alert("element: " + element.id)
  }

  ArreterAlgo() {
    $('.ResultatRow1').hide(1000);
    $('.container').css("margin-bottom", "15%");
  }

  importer(stepper: any) {
    let a = setTimeout(() => this.showLoaderImportation(stepper), 2000);
    this.counter = 5;

  }

  ErreursDetails(Bsubmit: string, Title: string) {
    switch (Bsubmit) {
      case "ErreurG":
        this.http.post(this.PageData[1].url + "/Generation/AffichageErreurGroupe/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);



              // console.log(this.ComingData)
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurD":
        this.http.post(this.PageData[1].url + "/Generation/AffichageErreurDuree/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurS":
        this.http.post(this.PageData[1].url + "/Generation/AffichageErreurNbSeance/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurI":
        this.http.post(this.PageData[1].url + "/Generation/AffichageErreurIntrv/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurE":
        this.http.post(this.PageData[1].url + "/Generation/AffichageErreurNbEtud/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurH":
        this.http.post(this.PageData[1].url + "/Generation/AffichageHorsDisp/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurSN":
        this.http.post(this.PageData[1].url + "/Generation/AffichageSectionNonPlanif/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;
      case "ErreurNS":
        this.http.post(this.PageData[1].url + "/Generation/AffichageNonSaisieDisp/" + this.PageData[1].username, null)
          .subscribe({
            next: (response: any) => {
              this.data = [];
              this.key = [];
              this.value = [];
              this.TitreTableau = Title;
              this.data = response;
              this.CreatTable(Bsubmit, Title);
              console.log("Response: ", response);
            },
            error: (error) => {
              console.error("Erreur: ", error)
            }
          })
        break;


    }


  }



  showLoaderImportation(stepper: any) {
    $(".fin").hide();
    $("#Title2HideImporter").hide(500);
    $("#btnLancer").hide(100);
    $(".choses").hide(2000);
    $(".case").show(2000);
    this.checkPreTraitement(stepper);
    let intervalId = setInterval(() => {
      $(".arreter").html("Arreter");
      $(".arreter").click(() => {
        this.ArreterPreTraitement();
      })
      this.counter--;
      if (this.counter === 0) {
        clearInterval(intervalId);

        $("#Title2HideImporter").show();
        $(".fin").hide();
        $(".choses").show();
        $(".case").hide();
        $('.classic-1').show();
        $(".arreter").html("Suivant");
        $(".arreter").off("click")



        $('.classic-1').hide(1000);
        $('.info').css({
          "filter": "brightness(120%)",
          'color': "white"
        });
        $('.fin').show(1000);
      }
    }, 1000);
  }
LancerPreTraiAlgo(stepper :any){


  this.http.post("https://smartplanning-backend.herokuapp.com/Generation" + "/ResumePreTPlanificationGenerees/" + "nasr",null)
    .subscribe(
      (response: any) => {
        this.ComingDataResumerPre = response;
        stepper.next();
        console.log("Response: ", response);
      },
      (error) => {
        this.counter = 0;
        console.error("Erreur: ", error)
      })

}

}








import { Component, OnInit } from '@angular/core';

import { ProcessesService } from '../../../services/processes/processes.service';

@Component({
  selector: 'app-process-rr',
  templateUrl: './process-rr.component.html',
  styleUrls: ['./process-rr.component.scss']
})

export class ProcessRRComponent implements OnInit {
  stages = [
    {
      stage: 1,
      status: 'completed', // completed | process | notcompleted
      title: 'Reglas para nodos',
    },{
      stage: 2,
      status: 'process', // completed | process | notcompleted
      title: 'Validación de nodos',
    },{
      stage: 3,
      status: 'notcompleted', // completed | process | notcompleted
      title: 'Reglas de Negocio RR',
    },
    {
      stage: 4,
      status: 'notcompleted', // completed | process | notcompleted
      title: 'Generación Nodos y Cuentas',
    },{
      stage: 5,
      status: 'notcompleted', // completed | process | notcompleted
      title: 'Cargue Información de Rentas',
    },{
      stage: 6,
      status: 'notcompleted', // completed | process | notcompleted
      title: 'Generación Archivos de Facturación',
    }
  ];

  constructor(private processesSvc: ProcessesService) { }
  stageSelected = 2;

  ngOnInit(): void {
  }

  changeStage(stage) {
    console.log('changeState()', stage);
    this.stageSelected = stage.stage;
  }

  runRuleNodes() {
    this.processesSvc.runNodesRules().subscribe(resp => {
      console.log('runNodesRules()', resp);

    })
  }
}

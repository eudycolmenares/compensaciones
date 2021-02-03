import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})

export class LoadComponent implements OnInit {
  @ViewChild('inputFileTxt') inputForTxt: ElementRef;
  structureToTable: object[] = [{}];
  dataToTable = [{}];
  structureNodes: object[] = [
    {
      name: 'DDCRTD',
      description: 'DDCRTD',
      validation: '',
    },
    {
      name: 'DDACCT',
      description: 'DDACCT',
      validation: '',
    },
    {
      name: 'ESTRATO',
      description: 'ESTRATO',
      validation: '',
    },
    {
      name: 'TARIFA',
      description: 'TARIFA',
      validation: '',
    },
    {
      name: 'DDSERV',
      description: 'DDSERV',
      validation: '',
    },
    {
      name: 'DDDESC',
      description: 'DDDESC',
      validation: '',
    },
    {
      name: 'GRUPO',
      description: 'GRUPO',
      validation: '',
    },
    {
      name: 'SUBGRUP',
      description: 'SUBGRUP',
      validation: '',
    },
    {
      name: 'DDAMT$',
      description: 'DDAMT$',
      validation: '',
    },
    {
      name: 'NODO',
      description: 'NODO',
      validation: '',
    }
  ];
  structureAccounts: object[] = [
    {
      name: 'DDCRTD',
      description: 'DDCRTD',
      validation: '',
    },
    {
      name: 'DDACCT',
      description: 'DDACCT',
      validation: '',
    },
    {
      name: 'ESTRATO',
      description: 'ESTRATO',
      validation: '',
    },
    {
      name: 'TARIFA',
      description: 'TARIFA',
      validation: '',
    },
    {
      name: 'DDSERV',
      description: 'DDSERV',
      validation: '',
    },
    {
      name: 'DDDESC',
      description: 'DDDESC',
      validation: '',
    },
    {
      name: 'GRUPO',
      description: 'GRUPO',
      validation: '',
    },
    {
      name: 'SUBGRUP',
      description: 'SUBGRUP',
      validation: '',
    },
    {
      name: 'DDAMT$',
      description: 'DDAMT$',
      validation: '',
    }
  ];
  caseUse = '';
  templateOptionsList: object[] = [{valueOption: 'nodes', nameOption: 'Nodos'}, {valueOption: 'accounts', nameOption: 'Cuentas'}] ;

  constructor(
    private _confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  generateClickInput(option: string): void {
    this.caseUse = option;
    this.inputForTxt.nativeElement.click();
  }

  async handleChangeInputFile(event: Event): Promise<void> {
    console.log('handleChangeInputFile()');
    const filesCsv: FileList = event.target['files'];
    const nameFile = filesCsv[0].name;
    if (filesCsv.length) {
      const lector = new FileReader();
      lector.onload = (e) => {
        const content = e.target.result;
        const contentLines = (content as string).split(/\r?\n/);
        switch (this.caseUse) {
          case 'nodes':
            console.log('nodes!!!');
            this.structureDataTable(contentLines, this.structureNodes);
            break;
          case 'accounts':
            console.log('accounts!!!');
            this.structureDataTable(contentLines, this.structureAccounts);
            break;
        }
      };
      lector.readAsText(filesCsv[0]);
      this.inputForTxt.nativeElement.value = '';
    }
  }

  structureDataTable(contentLines: string[], structure: object[]) {
    this.structureToTable = [];
    this.dataToTable = [];
    for (const i of contentLines) {
      const lineSegmented = i.split(/\t/);
      const newObj = {};
      for (let index = 0; index < structure.length; index++) {
        const ele = structure[index];
        newObj[ele['name']] = lineSegmented[index];
      }
      this.dataToTable.push(newObj);
    }
    this.structureToTable = structure;
  }

  openModal() {
    this._confirmationService.confirm({
      message: `Todos estos registros reflejados en la tabla, seran almacenados para su posterior procesamiento</p>`,
      accept: () => {
        // this.sendDataToDelete(item);
      },
      reject: () => { },
    });
  }
}

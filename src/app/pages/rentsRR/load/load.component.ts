import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// modal

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Confirmar</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>¿Estás seguro de que desea cargar esta información?</strong></p>
    <p>Todos estos registros reflejados en la tabla, seran almacenados para su posterior procesamiento.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Aceptar</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}


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

  constructor(
    private modalService: NgbModal
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
    const modal = this.modalService.open(NgbdModalConfirm);
    modal.result.then(result => {
      // this.sendDataToDelete(item);
    }).catch(error => {});
  }
}

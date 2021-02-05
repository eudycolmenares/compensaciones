import { Component, OnInit } from '@angular/core';

import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-rr-compensated-accounts',
  templateUrl: './rr-compensated-accounts.component.html',
  styleUrls: ['./rr-compensated-accounts.component.scss'],
})
export class RrCompensatedAccountsComponent implements OnInit {
  currentDate: Date = new Date();
  nameSelectedTable: string;
  templateOptionsList : object[] = [
    { valueOption: 'DetalleCompensacion', nameOption: 'DetalleCompensacion' },
    { valueOption: 'TCAAUF00', nameOption: 'TCAAUF00' },
    { valueOption: 'NotasCompensacion', nameOption: 'Notas_Compensacion' },
  ];
  // table
  dataToTable: any[];
  dataToSelectedTable: any[];
  structure: object[] = [];

  constructor(private _toastScv: ToastService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // seteado
    setTimeout(() => {
      this.dataToTable = [
        {
          date: 'fecha1',
          account: 'cuenta1',
          nameProduct: 'nombreProducto1',
          notification: 'TrfPqrAviso1',
          serviceDescription: 'descripciónServicio1',
          nameService: 'nombreServicio1',
          lastRentalDate: 'FechaUltimaRenta1',
          categoryDescription: 'descripciónCategoría1',
          valueDefinedAverage: 'valorDefinidoPromdio1',
          valueCompensation: 'valorCompensación1',
          compensationCode: 'códigoCompensación1',
          ticketNumber: 'númeroTicket1',
        },
        {
          date: 'fecha2',
          account: 'cuenta2',
          nameProduct: 'nombreProducto2',
          notification: 'TrfPqrAviso2',
          serviceDescription: 'descripciónServicio2',
          nameService: 'nombreServicio2',
          lastRentalDate: 'FechaUltimaRenta2',
          categoryDescription: 'descripciónCategoría2',
          valueDefinedAverage: 'valorDefinidoPromdio2',
          valueCompensation: 'valorCompensación2',
          compensationCode: 'códigoCompensación2',
          ticketNumber: 'númeroTicket2',
        },
        {
          date: 'fecha3',
          account: 'cuenta3',
          nameProduct: 'nombreProducto3',
          notification: 'TrfPqrAviso3',
          serviceDescription: 'descripciónServicio3',
          nameService: 'nombreServicio3',
          lastRentalDate: 'FechaUltimaRenta3',
          categoryDescription: 'descripciónCategoría3',
          valueDefinedAverage: 'valorDefinidoPromdio3',
          valueCompensation: 'valorCompensación3',
          compensationCode: 'códigoCompensación3',
          ticketNumber: 'númeroTicket3',
        },
        {
          date: 'fecha4',
          account: 'cuenta4',
          nameProduct: 'nombreProducto4',
          notification: 'TrfPqrAviso4',
          serviceDescription: 'descripciónServicio4',
          nameService: 'nombreServicio4',
          lastRentalDate: 'FechaUltimaRenta4',
          categoryDescription: 'descripciónCategoría4',
          valueDefinedAverage: 'valorDefinidoPromdio4',
          valueCompensation: 'valorCompensación4',
          compensationCode: 'códigoCompensación4',
          ticketNumber: 'númeroTicket4',
        },
        {
          date: 'fecha5',
          account: 'cuenta5',
          nameProduct: 'nombreProducto5',
          notification: 'TrfPqrAviso5',
          serviceDescription: 'descripciónServicio5',
          nameService: 'nombreServicio5',
          lastRentalDate: 'FechaUltimaRenta5',
          categoryDescription: 'descripciónCategoría5',
          valueDefinedAverage: 'valorDefinidoPromdio5',
          valueCompensation: 'valorCompensación5',
          compensationCode: 'códigoCompensación5',
          ticketNumber: 'númeroTicket5',
        },
        {
          date: 'fecha6',
          account: 'cuenta6',
          nameProduct: 'nombreProducto6',
          notification: 'TrfPqrAviso6',
          serviceDescription: 'descripciónServicio6',
          nameService: 'nombreServicio6',
          lastRentalDate: 'FechaUltimaRenta6',
          categoryDescription: 'descripciónCategoría6',
          valueDefinedAverage: 'valorDefinidoPromdio6',
          valueCompensation: 'valorCompensación6',
          compensationCode: 'códigoCompensación6',
          ticketNumber: 'númeroTicket6',
        },
        {
          date: 'fecha7',
          account: 'cuenta7',
          nameProduct: 'nombreProducto7',
          notification: 'TrfPqrAviso7',
          serviceDescription: 'descripciónServicio7',
          nameService: 'nombreServicio7',
          lastRentalDate: 'FechaUltimaRenta7',
          categoryDescription: 'descripciónCategoría7',
          valueDefinedAverage: 'valorDefinidoPromdio7',
          valueCompensation: 'valorCompensación7',
          compensationCode: 'códigoCompensación7',
          ticketNumber: 'númeroTicket7',
        },
        {
          date: 'fecha8',
          account: 'cuenta8',
          nameProduct: 'nombreProducto8',
          notification: 'TrfPqrAviso8',
          serviceDescription: 'descripciónServicio8',
          nameService: 'nombreServicio8',
          lastRentalDate: 'FechaUltimaRenta8',
          categoryDescription: 'descripciónCategoría8',
          valueDefinedAverage: 'valorDefinidoPromdio8',
          valueCompensation: 'valorCompensación8',
          compensationCode: 'códigoCompensación8',
          ticketNumber: 'númeroTicket8',
        },
        {
          date: 'fecha9',
          account: 'cuenta9',
          nameProduct: 'nombreProducto9',
          notification: 'TrfPqrAviso9',
          serviceDescription: 'descripciónServicio9',
          nameService: 'nombreServicio9',
          lastRentalDate: 'FechaUltimaRenta9',
          categoryDescription: 'descripciónCategoría9',
          valueDefinedAverage: 'valorDefinidoPromdio9',
          valueCompensation: 'valorCompensación9',
          compensationCode: 'códigoCompensación9',
          ticketNumber: 'númeroTicket9',
        },
        {
          date: 'fecha10',
          account: 'cuenta10',
          nameProduct: 'nombreProducto10',
          notification: 'TrfPqrAviso10',
          serviceDescription: 'descripciónServicio10',
          nameService: 'nombreServicio10',
          lastRentalDate: 'FechaUltimaRenta10',
          categoryDescription: 'descripciónCategoría10',
          valueDefinedAverage: 'valorDefinidoPromdio10',
          valueCompensation: 'valorCompensación10',
          compensationCode: 'códigoCompensación10',
          ticketNumber: 'númeroTicket10',
        },
        {
          date: 'fecha11',
          account: 'cuenta11',
          nameProduct: 'nombreProducto11',
          notification: 'TrfPqrAviso11',
          serviceDescription: 'descripciónServicio11',
          nameService: 'nombreServicio11',
          lastRentalDate: 'FechaUltimaRenta11',
          categoryDescription: 'descripciónCategoría11',
          valueDefinedAverage: 'valorDefinidoPromdio11',
          valueCompensation: 'valorCompensación11',
          compensationCode: 'códigoCompensación11',
          ticketNumber: 'númeroTicket11',
        },
        {
          date: 'fecha12',
          account: 'cuenta12',
          nameProduct: 'nombreProducto12',
          notification: 'TrfPqrAviso12',
          serviceDescription: 'descripciónServicio12',
          nameService: 'nombreServicio12',
          lastRentalDate: 'FechaUltimaRenta12',
          categoryDescription: 'descripciónCategoría12',
          valueDefinedAverage: 'valorDefinidoPromdio12',
          valueCompensation: 'valorCompensación12',
          compensationCode: 'códigoCompensación12',
          ticketNumber: 'númeroTicket12',
        },
        {
          date: 'fecha13',
          account: 'cuenta13',
          nameProduct: 'nombreProducto13',
          notification: 'TrfPqrAviso13',
          serviceDescription: 'descripciónServicio13',
          nameService: 'nombreServicio13',
          lastRentalDate: 'FechaUltimaRenta13',
          categoryDescription: 'descripciónCategoría13',
          valueDefinedAverage: 'valorDefinidoPromdio13',
          valueCompensation: 'valorCompensación13',
          compensationCode: 'códigoCompensación13',
          ticketNumber: 'númeroTicket13',
        },
        {
          date: 'fecha14',
          account: 'cuenta14',
          nameProduct: 'nombreProducto14',
          notification: 'TrfPqrAviso14',
          serviceDescription: 'descripciónServicio14',
          nameService: 'nombreServicio14',
          lastRentalDate: 'FechaUltimaRenta14',
          categoryDescription: 'descripciónCategoría14',
          valueDefinedAverage: 'valorDefinidoPromdio14',
          valueCompensation: 'valorCompensación14',
          compensationCode: 'códigoCompensación14',
          ticketNumber: 'númeroTicket14',
        },
        {
          date: 'fecha15',
          account: 'cuenta15',
          nameProduct: 'nombreProducto15',
          notification: 'TrfPqrAviso15',
          serviceDescription: 'descripciónServicio15',
          nameService: 'nombreServicio15',
          lastRentalDate: 'FechaUltimaRenta15',
          categoryDescription: 'descripciónCategoría15',
          valueDefinedAverage: 'valorDefinidoPromdio15',
          valueCompensation: 'valorCompensación15',
          compensationCode: 'códigoCompensación15',
          ticketNumber: 'númeroTicket15',
        },
        {
          date: 'fecha16',
          account: 'cuenta16',
          nameProduct: 'nombreProducto16',
          notification: 'TrfPqrAviso16',
          serviceDescription: 'descripciónServicio16',
          nameService: 'nombreServicio16',
          lastRentalDate: 'FechaUltimaRenta16',
          categoryDescription: 'descripciónCategoría16',
          valueDefinedAverage: 'valorDefinidoPromdio16',
          valueCompensation: 'valorCompensación16',
          compensationCode: 'códigoCompensación16',
          ticketNumber: 'númeroTicket16',
        },
        {
          date: 'fecha17',
          account: 'cuenta17',
          nameProduct: 'nombreProducto17',
          notification: 'TrfPqrAviso17',
          serviceDescription: 'descripciónServicio17',
          nameService: 'nombreServicio17',
          lastRentalDate: 'FechaUltimaRenta17',
          categoryDescription: 'descripciónCategoría17',
          valueDefinedAverage: 'valorDefinidoPromdio17',
          valueCompensation: 'valorCompensación17',
          compensationCode: 'códigoCompensación17',
          ticketNumber: 'númeroTicket17',
        },
        {
          date: 'fecha18',
          account: 'cuenta18',
          nameProduct: 'nombreProducto18',
          notification: 'TrfPqrAviso18',
          serviceDescription: 'descripciónServicio18',
          nameService: 'nombreServicio18',
          lastRentalDate: 'FechaUltimaRenta18',
          categoryDescription: 'descripciónCategoría18',
          valueDefinedAverage: 'valorDefinidoPromdio18',
          valueCompensation: 'valorCompensación18',
          compensationCode: 'códigoCompensación18',
          ticketNumber: 'númeroTicket18',
        },
        {
          date: 'fecha19',
          account: 'cuenta19',
          nameProduct: 'nombreProducto19',
          notification: 'TrfPqrAviso19',
          serviceDescription: 'descripciónServicio19',
          nameService: 'nombreServicio19',
          lastRentalDate: 'FechaUltimaRenta19',
          categoryDescription: 'descripciónCategoría19',
          valueDefinedAverage: 'valorDefinidoPromdio19',
          valueCompensation: 'valorCompensación19',
          compensationCode: 'códigoCompensación19',
          ticketNumber: 'númeroTicket19',
        },
        {
          date: 'fecha20',
          account: 'cuenta20',
          nameProduct: 'nombreProducto20',
          notification: 'TrfPqrAviso20',
          serviceDescription: 'descripciónServicio20',
          nameService: 'nombreServicio20',
          lastRentalDate: 'FechaUltimaRenta20',
          categoryDescription: 'descripciónCategoría20',
          valueDefinedAverage: 'valorDefinidoPromdio20',
          valueCompensation: 'valorCompensación20',
          compensationCode: 'códigoCompensación20',
          ticketNumber: 'númeroTicket20',
        },
        {
          date: 'fecha21',
          account: 'cuenta21',
          nameProduct: 'nombreProducto21',
          notification: 'TrfPqrAviso21',
          serviceDescription: 'descripciónServicio21',
          nameService: 'nombreServicio21',
          lastRentalDate: 'FechaUltimaRenta21',
          categoryDescription: 'descripciónCategoría21',
          valueDefinedAverage: 'valorDefinidoPromdio21',
          valueCompensation: 'valorCompensación21',
          compensationCode: 'códigoCompensación21',
          ticketNumber: 'númeroTicket21',
        },
        {
          date: 'fecha22',
          account: 'cuenta22',
          nameProduct: 'nombreProducto22',
          notification: 'TrfPqrAviso22',
          serviceDescription: 'descripciónServicio22',
          nameService: 'nombreServicio22',
          lastRentalDate: 'FechaUltimaRenta22',
          categoryDescription: 'descripciónCategoría22',
          valueDefinedAverage: 'valorDefinidoPromdio22',
          valueCompensation: 'valorCompensación22',
          compensationCode: 'códigoCompensación22',
          ticketNumber: 'númeroTicket22',
        },
        {
          date: 'fecha23',
          account: 'cuenta23',
          nameProduct: 'nombreProducto23',
          notification: 'TrfPqrAviso23',
          serviceDescription: 'descripciónServicio23',
          nameService: 'nombreServicio23',
          lastRentalDate: 'FechaUltimaRenta23',
          categoryDescription: 'descripciónCategoría23',
          valueDefinedAverage: 'valorDefinidoPromdio23',
          valueCompensation: 'valorCompensación23',
          compensationCode: 'códigoCompensación23',
          ticketNumber: 'númeroTicket23',
        },
        {
          date: 'fecha24',
          account: 'cuenta24',
          nameProduct: 'nombreProducto24',
          notification: 'TrfPqrAviso24',
          serviceDescription: 'descripciónServicio24',
          nameService: 'nombreServicio24',
          lastRentalDate: 'FechaUltimaRenta24',
          categoryDescription: 'descripciónCategoría24',
          valueDefinedAverage: 'valorDefinidoPromdio24',
          valueCompensation: 'valorCompensación24',
          compensationCode: 'códigoCompensación24',
          ticketNumber: 'númeroTicket24',
        },
        {
          date: 'fecha25',
          account: 'cuenta25',
          nameProduct: 'nombreProducto25',
          notification: 'TrfPqrAviso25',
          serviceDescription: 'descripciónServicio25',
          nameService: 'nombreServicio25',
          lastRentalDate: 'FechaUltimaRenta25',
          categoryDescription: 'descripciónCategoría25',
          valueDefinedAverage: 'valorDefinidoPromdio25',
          valueCompensation: 'valorCompensación25',
          compensationCode: 'códigoCompensación25',
          ticketNumber: 'númeroTicket25',
        },
      ];
      // [
      //   {
      //     date: new Date(),
      //     account: 'user123',
      //     nameProduct: 'Internet 20MB',
      //     notification: 'test 1',
      //     serviceDescription: 'internet test 20mb',
      //     nameService: 'internet',
      //     lastRentalDate: new Date(),
      //     categoryDescription: 'hogar',
      //     valueDefinedAverage: '20000',
      //     valueCompensation: '2000',
      //     compensationCode: 'compTest123',
      //     ticketNumber: '1231312',
      //   },
      // ];
    }, 10000);
  }

  selectedTable(selectTable: string, name: string) {
    this.nameSelectedTable = name;
    switch (selectTable) {
      case 'DetalleCompensacion':
        this.structure = [
          {
            name: 'date',
            description: 'Fecha',
            validation: '',
          },
          {
            name: 'account',
            description: 'Cuenta',
            validation: '',
          },
          {
            name: 'nameProduct',
            description: 'Producto',
            validation: '',
          },
          {
            name: 'notification',
            description: 'Trf Pqr aviso',
            validation: '',
          },
          {
            name: 'serviceDescription',
            description: 'Desc Servicio',
            validation: '',
          },
          {
            name: 'nameService',
            description: 'Servicio',
            validation: '',
          },
          {
            name: 'lastRentalDate',
            description: 'Fecha Ult Renta',
            validation: '',
          },
          {
            name: 'categoryDescription',
            description: 'Desc Categoria',
            validation: '',
          },
          {
            name: 'valueDefinedAverage',
            description: 'Valor Def Promedio',
            validation: '',
          },
          {
            name: 'valueCompensation',
            description: 'Valor Compensación',
            validation: '',
          },
          {
            name: 'compensationCode',
            description: 'Cod Compensación',
            validation: '',
          },
          {
            name: 'ticketNumber',
            description: 'Num Ticket',
            validation: '',
          },
        ];
        break;
      case 'TCAAUF00':
        this.structure = [
          {
            name: 'account',
            description: 'Cuenta',
            validation: '',
          },
          {
            name: 'compensationCode',
            description: 'Cod Compensación',
            validation: '',
          },
          {
            name: 'valueCompensation',
            description: 'Valor Compensación',
            validation: '',
          },
          {
            name: 'date',
            description: 'Fecha',
            validation: '',
          },
        ];
        break;

      default:
        break;
    }
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv(this.nameSelectedTable + '.csv', this.dataToTable);
    }
  }

  exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ' ';
    const keys = Object.keys(rows[0]);
    // const keys = ['date','account'];

    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell.toLocaleString();
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    this._toastScv.showSuccess('Archivo descargado correctamente');
  }
}

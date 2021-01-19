import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})

export class DownloadComponent implements OnInit {
  // table
  dataToTableNodes: object[];
  dataToTableAccounts: object[];
  structureNodes: object[] = [
    {
      name: 'node',
      description: 'NODOS',
      validation: '',
    }
  ];
  structureAccounts: object[] = [
    {
      name: 'account',
      description: 'CUENTAS',
      validation: '',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() { // seteado
    setTimeout(()=>{
      this.dataToTableNodes = [
        {
          node: '853'
        },{
          node: '854'
        },{
          node: '855'
        },{
          node: '856'
        },{
          node: '857'
        },{
          node: '858'
        },{
          node: '859'
        },{
          node: '860'
        },{
          node: '861'
        },{
          node: '862'
        },{
          node: '863'
        },{
          node: '864'
        },{
          node: '865'
        },{
          node: '866'
        },{
          node: '867'
        }
      ];
      this.dataToTableAccounts = [
        {
          account: '108577'
        },{
          account: '108578'
        },{
          account: '108579'
        },{
          account: '108580'
        },{
          account: '108581'
        },{
          account: '108582'
        },{
          account: '108583'
        },{
          account: '108584'
        },{
          account: '108585'
        },{
          account: '108586'
        },{
          account: '108587'
        },{
          account: '108588'
        },{
          account: '108589'
        },{
          account: '108590'
        },{
          account: '108591'
        }
      ];
    },100)
  }

  generateFile(caseUse: string) {
    console.log('generateFile() > ', caseUse);
    let content = '';
    let namefile = '';
    switch (caseUse) {
      case 'nodes':
        for (const item of this.dataToTableNodes) {
          (content === '') ? content = item['node'] : content = `${content}\n${item['node']}`;
        }
        namefile = 'nodes-test.txt'
        break;
      case 'accounts':
        for (const item of this.dataToTableAccounts) {
          (content === '') ? content = item['account'] : content = `${content}\n${item['account']}`;
        }
        namefile = 'accounts-test.txt'
        break;
    }
    this.exportToFile(content , namefile)
  }

  exportToFile(csvContent: string, nameFile: string): void {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display:none');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = nameFile;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

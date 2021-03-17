import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as PDFMake from 'pdfmake';
import * as uuid from 'uuid-v4';
import pdfMake from "pdfmake/build/pdfmake";


@Controller()
export class AppController {
  private _pdfMake: any;
  constructor(private readonly appService: AppService) {
    this._pdfMake = new PDFMake({
      Roboto: {
        normal: `fonts\\Roboto-Regular.ttf`,
        bold: `fonts\\Roboto-Medium.ttf`,
        italics: `fonts\\Roboto-Italic.ttf`,
        bolditalics: `fonts\\Roboto-MediumItalic.ttf`
      }
    });
   }
  

   columns = [];
   docDefinition = {
    footer: function(currentPage, pageCount) { return[
      { text : currentPage.toString() + ' of ' + pageCount, alignment: "center" },]},
    header: function(currentPage, pageCount, pageSize) {
      // you can apply any logic and return any valid pdfmake element
  
      return [
        { image : "src/assets/logo.png", alignment:  'left', height : 100, width : 100 },
        { canvas: [ { type: 'rect', x: 370, y: 32, w: pageSize.width - 170, h: 40 } ] }
      ]
    },
  

    content: [
      
    ]
  }

  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/generatePDF')
  generatePDF() {
   
   /*
    this.columns.push({
      width: '55%',
      stack: [
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  fontSize: 10,
                  fillColor: '#f9f9f9',
                  alignment: 'left',
                  columns: [
                    {
                      margin: [10, 10, 10, 10],
                      text: "Caractéristiques",
                      style: 'strong'
                    }
                  ]
                }
              ],
              [
                {
                  fontSize: 10,
                  fillColor: '#f9f9f9',
                  alignment: 'left',
                  columns: [
                    {
                      margin: [10, 0, 0, 0],
                      stack: [
                        {
                          table: {
                            widths: ['*'],
                            body: [
                              [
                                {
                                  fontSize: 10,
                                  fillColor: '#454f63',
                                  color: '#fff',
                                  alignment: 'left',
                                  columns: [
                                    {
                                      stack: [
                                        {
                                          margin: [0, 5, 0, 5],
                                          text: "Carac1"
                                          ,
                                          fontSize: 9
                                        },
                                        {
                                          margin: [0, 5, 0, 5],
                                          text: "Carac1 2"
                                          ,
                                          fontSize: 9
                                        },
  
                                      ]
                                    }
                                  ]
                                }
                              ]
                            ]
                          },
                          layout: {
                            defaultBorder: false
                          }
                        }
                      ]
                    },
                    {
                      margin: [0, 0, 10, 0],
                      stack: [
                        {
                          table: {
                            widths: ['*'],
                            body: [
                              [
                                {
                                  fontSize: 10,
                                  fillColor: '#454f63',
                                  color: '#fff',
                                  alignment: 'left',
                                  columns: [
                                    {
                                      stack: [
                                        {
                                          margin: [0, 5, 0, 5],
                                          text: "Carac 2"
                                          ,
                                          fontSize: 9
                                        },
  
                                      ]
                                    }
                                  ]
                                }
                              ]
                            ]
                          },
                          layout: {
                            defaultBorder: false
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            ]
          }
        }
      ]
    })
  
  
  
  
  
    this.docDefinition.content.push(
      {
      margin: [0, 0, 0, 0],
      columnGap: 10,
      columns: this.columns,
    }
    );*/
    this.docDefinition.content = [
      
      'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'First column'
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column'
          },
          {
            // fixed width
            width: 100,
            text: 'Third column'
          },
          {
            // % width
            width: '20%',
            text: 'Fourth column'
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      'This paragraph goes below all columns and has full width'
    ]
   this.docDefinition.content.push( {
     title : "Table",
    layout: 'lightHorizontalLines', // optional
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ '*', 'auto', 100, '*' ],

      body: [
        [ 'First', 'Second', 'Third', 'The last one' ],
        [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
        [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
      ]
    }
  })
    let file_name = 'pdfmake-exemple.pdf';
    const pdfDoc = this._pdfMake.createPdfKitDocument(this.docDefinition);
    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();
    return { 'file_name': file_name };
  }
}



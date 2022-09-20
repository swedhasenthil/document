import { Component } from '@angular/core';
import * as Data from './data.json';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'document';
  dtOptions: DataTables.Settings = {};
  datas: any;
  isExpand = false;
  openCoverages = false;
  indexSelectedCoverage = 1;
  dt: any;
  expanded: any;
  displayStyle: any = "none";
  closeModal: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true,
    };
    var dataJson = Data;
    this.datas = dataJson.data;
    this.isExpand = true;
    console.log("data", this.datas);
    this.datas.forEach((_datas: any) => {
      _datas.isExpanded = false;
    });

  }
  selectItemCoverages(index: number) {
    this.openCoverages = this.openCoverages && this.indexSelectedCoverage === index ? false : true;
    this.indexSelectedCoverage = index;
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


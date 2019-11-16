import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

interface AttributesNode {
  name: string;
  value?: string;
  type?: AttributeType;
  children?: AttributesNode[];
}

enum AttributeType {
  NUMBER = 'number',
  PERCENT = 'percent',
  GENDER = 'gender',
  BOOLEAN = 'boolean',
  COLOR = 'color'
}

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrls: ['./material-tree.component.css']
})
export class MaterialTreeComponent implements OnChanges {

  constructor() { }

  @ViewChild('tree', { static: false }) tree;

  @Input() treeData;
  isTreeExpanded = false;
  treeControl = new NestedTreeControl<AttributesNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AttributesNode>();

  hasChild = (_: number, node: AttributesNode) => !!node.children && node.children.length > 0;

  ngOnChanges() {
    this.dataSource.data = this.treeData;
    this.treeControl.dataNodes = this.treeData;
  }

  toggleTreeExpanded() {
    this.isTreeExpanded ? this.tree.treeControl.collapseAll() : this.tree.treeControl.expandAll();
    this.isTreeExpanded = !this.isTreeExpanded;
  }

}
